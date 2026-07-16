# Bookly Support Agent

A prototype customer support agent for **Bookly**, a fictional online bookstore. Built for the Decagon Solutions Engineering take-home: a Node/Express backend that orchestrates Claude's native tool use against order data and a policy knowledge base, and a React chat UI on top.

Handles three intents end to end:

- **Order status** — looks up live order data by account email from a Supabase `orders` table
- **Returns/refunds** — collects order, item, reason, and refund method, then enforces Bookly's return policy in code: a 30-day return window, explicit confirmation of the card on file before refunding to it, and mandatory human review for refunds.
- **General policy questions** — shipping, returns, payments, password reset, cancellation — answered via a `search_policies` tool instead of the model's own memory

## Requirements

- Node.js 20+ (built and tested on Node 22)
- An Anthropic API key with access to `claude-opus-4-8`
- A Supabase project with an `orders` table (see below) — optional; without it, `lookup_order` returns a clear "not configured" error instead of crashing, and everything else in the demo still works

## Setup

```bash
# Server
cd server
npm install
cp .env.example .env   # fill in ANTHROPIC_API_KEY, and SUPABASE_URL / SUPABASE_SECRET_KEY if you have a project
npm run dev             # http://localhost:8787

# Client (separate terminal)
cd ../client
npm install
npm run dev              # http://localhost:5174
```

Open http://localhost:5174. The Vite dev server proxies `/api/*` to the Express server on port 8787, so no CORS config is needed in dev.

## Try it

- **Order status + clarifying question:** "Where's my order?" → the agent asks for your account email (and optionally an order number) before calling `lookup_order`. Try `harry@example.com` against your Supabase `orders` table.
- **Multi-turn return flow:** "I want to return something" → the agent asks which order, which item, why, and how you'd like to be refunded, then calls `initiate_return`.
  - `jane.doe@example.com` / order `BK-10198`, item `ITM-3` ($11, delivered 20 days ago) → auto-approved once the agent confirms the card on file with you.
  - `jane.doe@example.com` / order `BK-10410`, item `ITM-6` ($1,450, delivered within the window) → eligible, but flagged for human review instead of auto-refunded (over the $1,000 threshold).
  - `priya.shah@example.com` / order `BK-10042` (delivered 70+ days ago) → `eligible: false`, the agent explains why.
- **General question:** "How long do I have to return something?" or "How do I reset my password?" → answered via `search_policies`, not the model's own memory.

### Two order data sources (a deliberate seam, not an oversight)

`lookup_order` (order status) and `initiate_return` (refunds) read from **different stores**, because they need different data:

| | `lookup_order` | `initiate_return` |
|---|---|---|
| Source | Live Supabase `orders` table | Local mock JSON (`server/data/`) |
| Fields available | order number, status, order date, amount | + item lines, delivered date, payment method |
| Why | This is the data the user's real orders DB actually has | Return eligibility, refund amount, and card confirmation need item- and payment-level detail the Supabase table doesn't carry |

In a real deployment these would be the same system (or the returns tool would call out to an OMS/payments service for the fields it's missing). For this demo, order-status lookups use whatever customers/orders actually exist in your Supabase project; the return-flow mock accounts below are separate and only exist locally.

Mock accounts for the **return flow** (see `server/data/customers.json` / `orders.json` for full detail):

| Email | Orders |
|---|---|
| `jane.doe@example.com` | `BK-10231` (shipped, in transit), `BK-10198` (delivered, return-eligible, $11), `BK-10410` (delivered, $1,450 — triggers human review) |
| `marcus.lee@example.com` | `BK-10305` (processing, not yet shipped) |
| `priya.shah@example.com` | `BK-10042` (delivered 70+ days ago, outside return window) |

### Supabase table

`lookup_order` expects a table (default name `orders`, configurable via `SUPABASE_ORDERS_TABLE`) shaped like:

| column | type |
|---|---|
| `id` | int8 |
| `created_at` | timestamptz |
| `order_number` | text |
| `order_status` | text |
| `order_amount` | numeric |
| `order_primary_email` | text |
| `order_date_time` | timestamp |

If Row Level Security is enabled on this table (Supabase's default for new tables), use a **secret key** (`sb_secret_...`, Settings → API → Secret keys), not the publishable/anon key — the publishable key will silently return zero rows instead of erroring, which would make the agent tell every customer "no orders found." The secret key is safe here because `server/lib/supabaseClient.js` only ever runs server-side and is never sent to the browser; it should never be used in client-side code. (Projects still on Supabase's legacy key system can use `SUPABASE_SERVICE_ROLE_KEY` instead — see `server/lib/supabaseClient.js` for the fallback order.)

## Architecture

```
client (React/Vite)  →  POST /api/chat  →  server (Express)
                                              │
                                     Claude tool-use loop
                                     (system prompt + tools)
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    │                          │                         │
              lookup_order              initiate_return            search_policies
                    │                          │                         │
           Supabase `orders` table    local mock JSON (items,     local policy
           (live order status)        delivery date, payment)     knowledge base
```

- `server/lib/systemPrompt.js` — persona, scope, and guardrails (identity check before order actions, no fabricating order/policy details, explicit card confirmation before refunding, ask before assuming).
- `server/lib/tools.js` — tool schemas + execution. Business rules (identity match, 30-day return window, $1,000 human-review threshold, card confirmation) are enforced in code, not left to the model.
- `server/lib/supabaseClient.js` — lazy Supabase client; throws a clear, catchable error if unconfigured rather than crashing the server at boot.
- `server/lib/agent.js` — the tool-use loop: calls Claude, executes any requested tools, feeds results back, repeats until the model returns a final text answer (capped at 6 iterations).
- `server/index.js` — Express app; keeps an in-memory conversation history per `sessionId` (mock only — resets on restart).
- `client/src/App.jsx` — chat UI; shows a badge on any assistant turn that used a tool, so tool use is visible rather than hidden.

## Known limitations (by design, for a ~4hr scope)

- Conversation history is in-memory per server process — no persistence across restarts, no real auth (an email is treated as a lightweight identity check, not verified).
- `search_policies` is a simple keyword-overlap search, not embeddings/RAG — good enough to demonstrate the tool-use pattern, but it can rank a tangentially-related policy above the best match on ambiguous phrasing.
- No streaming — responses are returned as a single JSON payload per turn.
- Order status and returns read from two different stores (see above) — a real deployment would unify them.

# Bookly Support Agent — Solution Pitch

*A rendered version of this deck (`pitch-deck.html`) is also included in the repo — open it in a browser for the formatted slides.*

---

## 1 / 5 — Thesis

**The model should decide. The code should enforce.**

A great CX agent isn't the one with the most eloquent system prompt — it's the one whose consequential actions are impossible to get wrong, because the rules that matter are load-bearing code, not language the model might paraphrase away. Bookly Support is built around that split: Claude reasons about intent, collects what's missing, and decides which tool to call — every irreversible outcome (a refund, a policy claim, an account match) is verified by a deterministic tool, not by trusting the completion.

- **Scenario:** Bookly — fictional online bookstore
- **Intents covered:** Order status · Returns/refunds · Policy Q&A
- **Model:** Claude Opus 4.8, native tool use
- **Stack:** Node/Express + React, Supabase

---

## 2 / 5 — Architecture

One inquiry, one orchestration loop, three narrow tools. Every message flows through the same loop: system prompt sets scope and guardrails, Claude either asks a clarifying question or calls a tool, the tool result comes back into context, and the loop repeats until Claude has a final answer for the customer.

```
client (React/Vite)  →  POST /api/chat  →  server (Express)
                                              │
                                     Claude tool-use loop
                                     (system prompt + up to 6 iterations)
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    │                          │                         │
              lookup_order              initiate_return            search_policies
                    │                          │                         │
           Supabase `orders` table    mock returns store          policy knowledge base
           (live order status)   (30-day window, card confirm,    (keyword retrieval)
                                   $1,000 review threshold)
```

- **Memory:** full message history (including tool calls/results) kept per `sessionId`, replayed each turn — no summarization needed at this scale.
- **Prompt:** one system prompt — persona, the three in-scope intents, and explicit guardrail instructions tied to each tool's return shape.
- **Transparency:** every tool call the model makes is surfaced in the UI as a badge — nothing happens invisibly, including to the person demoing it.

---

## 3 / 5 — Key decision: refund policy lives in the tool, not the prompt

`initiate_return` is not "a function the model calls to issue a refund" — it's where three real Bookly policies are enforced as executable checks, in order:

1. **30-day return window.** Ineligible orders return `eligible:false` with the exact reason (not delivered yet, or delivered too long ago) — the model can only relay it, not override it.
2. **Card confirmation before refunding to a card.** The tool withholds action and returns `confirmationRequired:true` with the masked card until the customer has explicitly confirmed the last 4 digits — the model can't skip this step even if it's confident.
3. **$1,000+ always routes to a human.** Above the threshold, the tool itself creates a `pending_human_review` case instead of a refund — eligibility alone is never sufficient for auto-approval.

**Trade-off:** every new policy nuance is a code change, not a prompt tweak — slower to iterate, and it doesn't generalize to policies nobody's written a check for yet.
**Worth it because:** a refund is money leaving the business. In an enterprise deployment, "the model was pretty sure" is not an acceptable audit trail for that — a deterministic rule is.

---

## 4 / 5 — Key decision: every tool call is gated on identity or grounded in a source

- **Identity check.** Account email is required before `lookup_order` or `initiate_return` can run — both tools reject a mismatched email/order pair server-side. *Trade-off:* a returning customer answers "what's your email" more than once in a session. *Worth it:* it's the one thing standing between this agent and reading a stranger's order history.
- **Retrieval over recall.** `search_policies` exists so shipping/returns/account answers come from a source the model can cite, not its own training data — which drifts from Bookly's actual, editable policy doc. *Trade-off:* the mocked keyword search sometimes ranks a tangential policy above the best match on ambiguous phrasing (a real embeddings-based retriever would fix this). *Worth it:* even a naive retriever beats a model asserting a return window from memory.
- **Clarify, don't guess.** The system prompt explicitly withholds `initiate_return` until order, item, reason, *and* refund method are all confirmed — so an underspecified "I want a refund" becomes a short back-and-forth, not a wrong guess.

---

## 5 / 5 — What I'd do differently

**i. Unify the order data — the first thing I'd change.** Order status reads from a live Supabase table; returns reads from a local mock store with item- and payment-level detail Supabase doesn't have — a seam I introduced deliberately to wire up the real DB without fabricating fields it doesn't carry. In production this is one order service (or the returns tool calls out to an OMS/payments API for what it's missing), not two sources of truth.

**ii. Real retrieval for policy answers.** Swap the keyword-overlap `search_policies` for embeddings-based semantic search, so phrasing like "how long until I get my money back" reliably beats a policy that merely shares a few words with the question.

**iii. Verified identity, not a lightweight check.** Email-as-identity is a reasonable stand-in for a chat demo but not a real auth boundary. Production wants session auth or a verification code before any order or refund action.

**iv. Persistence, streaming, and an eval harness.** Conversation history is in-memory and resets on restart; responses aren't streamed. And the thing I'd actually want most before shipping: a small eval set of real support transcripts to regression-test tool-call correctness — did it ask before assuming, did it enforce the review threshold — every time the prompt or tools change.

---

*Bookly Support Agent — Decagon Solutions Engineering take-home*

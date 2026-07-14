import express from 'express';
import cors from 'cors';
import { randomUUID } from 'node:crypto';
import { runTurn } from './lib/agent.js';

const PORT = process.env.PORT || 8787;

const app = express();
app.use(cors());
app.use(express.json());

// In-memory per-session conversation history. Mock/demo only - resets on restart.
const sessions = new Map();

app.post('/api/chat', async (req, res) => {
  const { message, sessionId } = req.body || {};
  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'message is required' });
  }

  const id = sessionId && sessions.has(sessionId) ? sessionId : randomUUID();
  if (!sessions.has(id)) sessions.set(id, []);
  const history = sessions.get(id);

  try {
    const { text, toolCalls } = await runTurn(history, message);
    res.json({ sessionId: id, reply: text, toolCalls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Agent error' });
  }
});

app.post('/api/reset', (req, res) => {
  const { sessionId } = req.body || {};
  if (sessionId) sessions.delete(sessionId);
  res.json({ ok: true });
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Bookly agent server listening on http://localhost:${PORT}`);
});

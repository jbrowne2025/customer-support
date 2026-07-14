import { useEffect, useRef, useState } from 'react';
import MessageBubble from './components/MessageBubble.jsx';
import { sendMessage, resetSession } from './lib/api.js';

const WELCOME = {
  role: 'assistant',
  text: "Hi, I'm Bookly Support. I can help with order status, returns and refunds, or general questions about shipping and your account. What's going on?",
};

export default function App() {
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const { reply, toolCalls } = await sendMessage(text);
      setMessages((prev) => [...prev, { role: 'assistant', text: reply, toolCalls }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleReset() {
    await resetSession();
    setMessages([WELCOME]);
    setError(null);
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-title">📚 Bookly Support</div>
        <button className="reset-btn" onClick={handleReset}>
          New conversation
        </button>
      </header>

      <div className="chat">
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} text={m.text} toolCalls={m.toolCalls} />
        ))}
        {loading && (
          <div className="bubble-row assistant">
            <div className="bubble typing">Thinking…</div>
          </div>
        )}
        {error && <div className="error-banner">Something went wrong: {error}</div>}
        <div ref={bottomRef} />
      </div>

      <form className="composer" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about an order, a return, or shipping..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}

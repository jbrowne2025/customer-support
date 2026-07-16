const SESSION_KEY = 'bookly_session_id';

export function getSessionId() {
  return localStorage.getItem(SESSION_KEY) || null;
}

function setSessionId(id) {
  localStorage.setItem(SESSION_KEY, id);
}

export async function sendMessage(message) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionId: getSessionId() }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  setSessionId(data.sessionId);
  return data;
}

export async function resetSession() {
  const sessionId = getSessionId();
  if (sessionId) {
    await fetch('/api/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    });
  }
  localStorage.removeItem(SESSION_KEY);
}

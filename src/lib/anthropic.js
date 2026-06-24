const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-6';
const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

function headers() {
  return {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-direct-browser-access': 'true',
  };
}

function systemPrompt(conditions, limit) {
  const conds = conditions.length ? conditions.join(', ') : 'none';
  return `You are a cholesterol nutrition expert. User conditions: ${conds}. Daily limit: ${limit}mg. Respond ONLY with valid JSON, no preamble or markdown fences.`;
}

function parseJson(raw) {
  return JSON.parse(raw.replace(/```json|```/g, '').trim());
}

async function send(body) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || `Anthropic API error (${res.status})`);
  }
  const text = data.content?.[0]?.text || '';
  return parseJson(text);
}

export async function askAI(prompt, { conditions = [], limit = 200 } = {}) {
  return send({
    model: MODEL,
    max_tokens: 1000,
    system: systemPrompt(conditions, limit),
    messages: [{ role: 'user', content: [{ type: 'text', text: prompt }] }],
  });
}

export async function askAIVision(base64, mediaType, prompt, { conditions = [], limit = 200 } = {}) {
  return send({
    model: MODEL,
    max_tokens: 1000,
    system: systemPrompt(conditions, limit),
    messages: [
      {
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } },
          { type: 'text', text: prompt },
        ],
      },
    ],
  });
}

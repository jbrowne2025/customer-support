const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-6';

function systemPrompt(conditions, limit) {
  const conds = conditions.length ? conditions.join(', ') : 'none';
  return `You are a cholesterol nutrition expert. User conditions: ${conds}. Daily limit: ${limit}mg. Respond ONLY with valid JSON, no preamble or markdown fences.`;
}

function parseJson(raw) {
  return JSON.parse(raw.replace(/```json|```/g, '').trim());
}

export async function askAI(prompt, { conditions = [], limit = 200 } = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1000,
      system: systemPrompt(conditions, limit),
      messages: [{ role: 'user', content: [{ type: 'text', text: prompt }] }],
    }),
  });
  const data = await res.json();
  const text = data.content?.[0]?.text || '';
  return parseJson(text);
}

export async function askAIVision(base64, mediaType, prompt, { conditions = [], limit = 200 } = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
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
    }),
  });
  const data = await res.json();
  const text = data.content?.[0]?.text || '';
  return parseJson(text);
}

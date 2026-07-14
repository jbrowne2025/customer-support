import { createClient } from '@supabase/supabase-js';

export const ORDERS_TABLE = process.env.SUPABASE_ORDERS_TABLE || 'orders';

let client = null;

// Lazy + memoized so a missing config doesn't crash server boot - it only
// surfaces when lookup_order actually runs, same as the Anthropic key.
export function getSupabaseClient() {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY;
  if (!url || !key) {
    throw new Error(
      'Supabase is not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY in server/.env to enable order lookups.',
    );
  }

  client = createClient(url, key);
  return client;
}

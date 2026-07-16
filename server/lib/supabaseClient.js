import { createClient } from '@supabase/supabase-js';

export const ORDERS_TABLE = process.env.SUPABASE_ORDERS_TABLE || 'orders';

let client = null;

// Lazy + memoized so a missing config doesn't crash server boot - it only
// surfaces when lookup_order actually runs, same as the Anthropic key.
export function getSupabaseClient() {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  // Prefer the secret key (sb_secret_...) - Supabase's current privileged
  // server-side key, replacing the legacy service_role JWT. This client only
  // ever runs server-side, never reaches the browser, and the orders table
  // has RLS enabled - the publishable/anon key would silently return zero
  // rows instead of erroring, which is worse. SUPABASE_SERVICE_ROLE_KEY is
  // kept as a fallback for projects still on legacy keys.
  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_KEY;
  if (!url || !key) {
    throw new Error(
      'Supabase is not configured. Set SUPABASE_URL and SUPABASE_SECRET_KEY in server/.env to enable order lookups.',
    );
  }

  client = createClient(url, key);
  return client;
}

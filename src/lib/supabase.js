import { createClient } from '@supabase/supabase-js';
const url = import.meta.env.VITE_DB_URL;
const key = import.meta.env.VITE_DB_KEY;
function validSettings() {
  try {
    if (!url || !key || !['http:', 'https:'].includes(new URL(url).protocol)) return false;
    if (key.startsWith('sb_secret_')) return false;
    if (key.split('.').length === 3) {
      const payload = JSON.parse(atob(key.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      if (payload.role === 'service_role') return false;
    }
    return true;
  } catch { return false; }
}
export const configurationError = validSettings() ? '' : 'A conexão com a escola ainda não foi configurada. Defina VITE_DB_URL e VITE_DB_KEY com uma chave pública do Supabase e gere o site novamente.';
export const supabase = configurationError ? null : createClient(url, key);

import { createClient } from "@supabase/supabase-js";
let client = null;
export let configurationError = "";
try {
  const url = import.meta.env.VITE_DB_URL;
  const key = import.meta.env.VITE_DB_KEY;
  if (!url || !key) throw new Error();
  // Only the existing browser-safe key belongs in this frontend.
  client = createClient(url, key);
} catch {
  configurationError =
    "Conexão não configurada. Defina VITE_DB_URL e VITE_DB_KEY no ambiente do projeto e reinicie a aplicação.";
}
export const supabase = client;

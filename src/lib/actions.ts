import { createClient } from "@supabase/supabase-js";
import { Database } from "../database.types.ts";

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function readSnippet() {
  const data = await supabase.from("snippets").select("*");
  return data;
}

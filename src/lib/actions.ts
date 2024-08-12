import { Database } from "@/database.types.ts";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function readSnippets() {
  const data = await supabase.from("snippets").select("*");
  return data;
}

export async function readTags() {
  const data = await supabase.from("tags").select("*");
  return data;
}

export async function updateSnippet({
  title,
  description,
  code,
  tags,
  language,
}: {
  title: string;
  description: string;
  code: string;
  tags: string[];
  language: string;
}) {
  const { data, error } = await supabase
    .from("snippets")
    .insert({ title, description, code, tags, language });

  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Data inserted successfully:", data);
  }
}

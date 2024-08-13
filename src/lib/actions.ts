import { Database } from "@/database.types.ts";
import { SnippetType, TagType } from "@/types/dbtypes";
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

export async function createNewSnippet() {
  const { data, error } = await supabase
    .from("snippets")
    .insert({
      title: "",
      description: "",
      code: "",
      tags: [],
      language: "javascript",
      favourite: false,
    })
    .select();

  if (error) {
    return {
      error: error.message,
      data: null,
    };
  } else {
    return {
      error: null,
      data: data[0] as SnippetType,
    };
  }
}

export async function updateSnippet(snippet: SnippetType) {
  const { error } = await supabase
    .from("snippets")
    .update({ ...snippet, updated_at: new Date().toISOString() })
    .eq("id", snippet.id);

  if (error) {
    return {
      error: error.message,
    };
  } else {
    return {
      error: null,
    };
  }
}

export async function updateSnippetLiked(id: string, favourite: boolean) {
  const { error } = await supabase
    .from("snippets")
    .update({ favourite })
    .eq("id", id);
  if (error) {
    return {
      error: error.message,
    };
  } else {
    return {
      error: null,
    };
  }
}

export async function deleteSnippet(id: string) {
  const { error } = await supabase.from("snippets").delete().eq("id", id);

  if (error) {
    return {
      error: error.message,
    };
  } else {
    return {
      error: null,
    };
  }
}

export async function createTag({
  name,
  colour,
}: {
  name: string;
  colour: string;
}) {
  const { data, error } = await supabase
    .from("tags")
    .insert({
      name,
      colour,
    })
    .select();

  if (error) {
    return {
      error: error.message,
      data: null,
    };
  } else {
    return {
      error: null,
      data: data[0] as TagType,
    };
  }
}

export async function deleteTag(id: string) {
  const { error } = await supabase.from("tags").delete().eq("id", id);

  if (error) {
    return {
      error: error.message,
    };
  } else {
    return {
      error: null,
    };
  }
}

export async function updateTag(tag: TagType) {
  const { error } = await supabase.from("tags").update(tag).eq("id", tag.id);

  if (error) {
    return {
      error: error.message,
    };
  } else {
    return {
      error: null,
    };
  }
}

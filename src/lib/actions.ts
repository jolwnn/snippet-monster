import { supabase } from "@/config/db";
import { SnippetType } from "@/types/dbtypes";

async function getCurrentUserId() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id;
}

export async function readSnippets() {
  const userId = await getCurrentUserId();
  if (!userId) return { error: "User not authenticated", data: null };

  const { data, error } = await supabase
    .from("snippets")
    .select("*")
    .eq("user_id", userId);

  return { data, error: error ? error.message : null };
}

export async function readTags() {
  const userId = await getCurrentUserId();
  if (!userId) return { error: "User not authenticated", data: null };

  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .eq("user_id", userId);

  return { data, error: error ? error.message : null };
}

export async function createNewSnippet() {
  const userId = await getCurrentUserId();
  if (!userId) return { error: "User not authenticated", data: null };

  const { data, error } = await supabase
    .from("snippets")
    .insert({
      title: "",
      description: "",
      code: "",
      tags: [],
      language: "javascript",
      favourite: false,
      user_id: userId,
    })
    .select();

  if (error) {
    return { error: error.message, data: null };
  } else {
    return { error: null, data: data[0] as SnippetType };
  }
}

export async function updateSnippet(snippet: SnippetType) {
  const userId = await getCurrentUserId();
  if (!userId) return { error: "User not authenticated" };

  const { error } = await supabase
    .from("snippets")
    .update({ ...snippet, updated_at: new Date().toISOString() })
    .eq("id", snippet.id)
    .eq("user_id", userId);

  return { error: error ? error.message : null };
}

export async function updateSnippetLiked(id: string, favourite: boolean) {
  const userId = await getCurrentUserId();
  if (!userId) return { error: "User not authenticated" };

  const { error } = await supabase
    .from("snippets")
    .update({ favourite })
    .eq("id", id)
    .eq("user_id", userId);

  return { error: error ? error.message : null };
}

export async function deleteSnippet(id: string) {
  const userId = await getCurrentUserId();
  if (!userId) return { error: "User not authenticated" };

  const { error } = await supabase
    .from("snippets")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  return { error: error ? error.message : null };
}

export async function createTag({
  name,
  colour,
}: {
  name: string;
  colour: string;
}) {
  const userId = await getCurrentUserId();
  if (!userId) return { error: "User not authenticated" };

  const { error } = await supabase.from("tags").insert({
    name,
    colour,
    user_id: userId,
  });

  return { error: error ? error.message : null };
}

export async function deleteTag(id: string) {
  const userId = await getCurrentUserId();
  if (!userId) return { error: "User not authenticated" };

  const { error } = await supabase
    .from("tags")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  return { error: error ? error.message : null };
}

export async function updateTag(tag: {
  id: string;
  name: string;
  colour: string;
}) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { error: "User not authenticated" };
  }
  const { error } = await supabase
    .from("tags")
    .update(tag)
    .eq("id", tag.id)
    .eq("user_id", userId);

  return { error: error ? error.message : null };
}

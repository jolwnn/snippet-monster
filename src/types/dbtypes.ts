import { Database } from "@/database.types.ts";

export type SnippetType = Database["public"]["Tables"]["snippets"]["Row"];

export type TagType = Database["public"]["Tables"]["tags"]["Row"];

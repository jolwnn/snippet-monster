import { readSnippets, readTags } from "@/lib/actions";
import { SnippetType, TagType } from "@/types/dbtypes";
import * as React from "react";

export interface GlobalContextType {
  editForm: {
    formState: "Create" | "Update" | "Closed";
    snippet: SnippetType | null;
  };
  setEditForm: React.Dispatch<
    React.SetStateAction<{
      formState: "Create" | "Update" | "Closed";
      snippet: SnippetType | null;
    }>
  >;
  snippets: SnippetType[] | null;
  tags: TagType[] | null;
  isPending: boolean;
  tagIdMap: Map<string, TagType> | null;
}

export const GlobalContext = React.createContext<GlobalContextType>({
  editForm: {
    formState: "Closed",
    snippet: null,
  },
  setEditForm: () => {},
  snippets: null,
  tags: null,
  isPending: false,
  tagIdMap: null,
});

export function GlobalProvider({ children }: React.PropsWithChildren) {
  const [editForm, setEditForm] = React.useState<{
    formState: "Create" | "Update" | "Closed";
    snippet: SnippetType | null;
  }>({
    formState: "Closed",
    snippet: null,
  });

  const [isPending, startTransition] = React.useTransition();

  const [snippets, setSnippets] = React.useState<SnippetType[] | null>(null);
  React.useEffect(() => {
    startTransition(() => {
      readSnippets().then((snippets) => {
        setSnippets(snippets.data as SnippetType[]);
      });
    });
  }, []); // Fetch Snippets

  const [tags, setTags] = React.useState<TagType[] | null>(null);
  React.useEffect(() => {
    startTransition(() => {
      readTags().then((tags) => {
        setTags(tags.data as TagType[]);
      });
    });
  }, []); // Fetch Tags

  const tagIdMap = React.useMemo(() => {
    const map = new Map<string, TagType>();
    tags?.forEach((tag) => {
      map.set(tag.id, tag);
    });
    return map;
  }, [tags]);

  return (
    <GlobalContext.Provider
      value={{ editForm, setEditForm, snippets, tags, isPending, tagIdMap }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

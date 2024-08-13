import { readSnippets, readTags } from "@/lib/actions";
import { SnippetType, TagType } from "@/types/dbtypes";
import * as React from "react";

export interface GlobalContextType {
  editForm: {
    formState: "Create" | "Update" | "Closed";
    snippet: SnippetType;
  };
  setEditForm: React.Dispatch<
    React.SetStateAction<{
      formState: "Create" | "Update" | "Closed";
      snippet: SnippetType;
    }>
  >;
  snippets: SnippetType[] | null;
  tags: TagType[] | null;
  isPending: boolean;
  tagIdMap: Map<string, TagType> | null;
  stepper: number;
  setStepper: React.Dispatch<React.SetStateAction<number>>;
}

export const GlobalContext = React.createContext<GlobalContextType>({
  editForm: {
    formState: "Closed",
    snippet: {
      id: "",
      created_at: "",
      updated_at: "",
      title: "",
      description: "",
      code: "",
      tags: [],
      language: null,
      favourite: false,
    },
  },
  setEditForm: () => {},
  snippets: null,
  tags: null,
  isPending: false,
  tagIdMap: null,
  stepper: 0,
  setStepper: () => {},
});

export function GlobalProvider({ children }: React.PropsWithChildren) {
  const [editForm, setEditForm] = React.useState<{
    formState: "Create" | "Update" | "Closed";
    snippet: SnippetType;
  }>({
    formState: "Closed",
    snippet: {
      id: "",
      created_at: "",
      updated_at: "",
      title: "",
      description: "",
      code: "",
      tags: [],
      language: null,
      favourite: false,
    },
  });

  const [isPending, startTransition] = React.useTransition();
  const [stepper, setStepper] = React.useState(0);

  const [snippets, setSnippets] = React.useState<SnippetType[] | null>(null);
  React.useEffect(() => {
    startTransition(() => {
      readSnippets().then((snippets) => {
        const sortedSnippets = snippets.data?.sort((a, b) => {
          return (
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
        });
        setSnippets(sortedSnippets as SnippetType[]);
      });
    });
  }, [stepper]); // Fetch Snippets

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
      value={{
        editForm,
        setEditForm,
        snippets,
        tags,
        isPending,
        tagIdMap,
        stepper,
        setStepper,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

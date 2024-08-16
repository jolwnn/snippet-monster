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
  otherSnippets: SnippetType[] | null;
  snippetsToShow: SnippetType[] | null;
  setSnippetsToShow: React.Dispatch<React.SetStateAction<SnippetType[] | null>>;
  tags: TagType[] | null;
  isPending: boolean;
  tagIdMap: Map<string, TagType> | null;
  stepper: number;
  setStepper: React.Dispatch<React.SetStateAction<number>>;
  tagStepper: number;
  setTagStepper: React.Dispatch<React.SetStateAction<number>>;
  tab: "all" | "favourites";
  setTab: React.Dispatch<React.SetStateAction<"all" | "favourites">>;
  selectedTag: string | null;
  setSelectedTag: React.Dispatch<React.SetStateAction<string | null>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
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
      user_id: null,
    },
  },
  setEditForm: () => {},
  snippets: null,
  otherSnippets: null,
  snippetsToShow: null,
  setSnippetsToShow: () => {},
  tags: null,
  isPending: false,
  tagIdMap: null,
  stepper: 0,
  setStepper: () => {},
  tagStepper: 0,
  setTagStepper: () => {},
  tab: "all",
  setTab: () => {},
  selectedTag: null,
  setSelectedTag: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
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
      user_id: null,
    },
  });

  const [isPending, startTransition] = React.useTransition();
  const [stepper, setStepper] = React.useState(0);
  const [tagStepper, setTagStepper] = React.useState(0);
  const [tab, setTab] = React.useState<"all" | "favourites">("all");
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  const [snippets, setSnippets] = React.useState<SnippetType[] | null>(null);
  const [otherSnippets, setOtherSnippets] = React.useState<
    SnippetType[] | null
  >(null);
  const [snippetsToShow, setSnippetsToShow] = React.useState<
    SnippetType[] | null
  >(null);

  React.useEffect(() => {
    startTransition(() => {
      readSnippets().then((snippets) => {
        const sortedSnippets = (snippets.data ?? []).sort((a, b) => {
          return (
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
        });
        setSnippets(sortedSnippets as SnippetType[]);
      });
    });
  }, [stepper]); // Fetch Snippets

  React.useEffect(() => {
    if (editForm.formState === "Closed") {
      setOtherSnippets(snippets ?? []);
    } else {
      setOtherSnippets(
        snippets?.filter((snippet) => snippet.id !== editForm.snippet.id) ?? []
      );
    }
  }, [editForm.formState, editForm.snippet.id, snippets]);

  React.useEffect(() => {
    const filterByTab =
      tab === "favourites"
        ? (otherSnippets?.filter((snippet) => snippet.favourite) ?? [])
        : (otherSnippets ?? []);
    const filterByTag = selectedTag
      ? filterByTab.filter((snippet) => snippet.tags?.includes(selectedTag))
      : filterByTab;
    const filterBySearchQuery =
      searchQuery === ""
        ? filterByTag
        : filterByTag.filter((snippet) =>
            snippet.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
    setSnippetsToShow(filterBySearchQuery);
  }, [otherSnippets, searchQuery, selectedTag, tab]);

  const [tags, setTags] = React.useState<TagType[] | null>(null);

  React.useEffect(() => {
    startTransition(() => {
      readTags().then((tags) => {
        setTags((tags.data ?? []) as TagType[]);
      });
    });
  }, [tagStepper]); // Fetch Tags

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
        otherSnippets,
        snippetsToShow,
        setSnippetsToShow,
        tags,
        isPending,
        tagIdMap,
        stepper,
        setStepper,
        tagStepper,
        setTagStepper,
        tab,
        setTab,
        selectedTag,
        setSelectedTag,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

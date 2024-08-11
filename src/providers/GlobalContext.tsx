import { readSnippet } from "@/lib/actions";
import { SnippetType } from "@/types/snippets";
import * as React from "react";

export interface GlobalContextType {
  snippets: SnippetType[];
  isPending: boolean;
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
}

export const GlobalContext = React.createContext<GlobalContextType>({
  snippets: [],
  isPending: false,
  editForm: {
    formState: "Closed",
    snippet: null,
  },
  setEditForm: () => {},
});

export function GlobalProvider({ children }: React.PropsWithChildren) {
  const [editForm, setEditForm] = React.useState<{
    formState: "Create" | "Update" | "Closed";
    snippet: SnippetType | null;
  }>({
    formState: "Closed",
    snippet: null,
  });

  const [snippets, setSnippets] = React.useState<SnippetType[]>([]);
  const [isPending, startTransition] = React.useTransition();
  React.useEffect(() => {
    startTransition(() => {
      readSnippet().then((snippets) => {
        setSnippets(snippets.data as SnippetType[]);
      });
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{ editForm, setEditForm, snippets, isPending }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

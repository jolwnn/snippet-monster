"use client";
import { readSnippet } from "@/lib/actions";
import * as React from "react";
import { Skeleton } from "../ui/skeleton";
import { SnippetCard } from "./SnippetCard";
import { SnippetType } from "@/types/snippets";

export default function SnippetGrid() {
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
    <>
      <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isPending ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
              <Skeleton className="w-full h-full" />
            ))}
          </>
        ) : (
          <>
            {snippets.map((snippet) => (
              <SnippetCard snippet={snippet} />
            ))}
          </>
        )}
      </div>
    </>
  );
}

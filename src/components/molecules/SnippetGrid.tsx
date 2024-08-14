"use client";
import { SnippetCard } from "@/components/molecules/SnippetCard";
import Starter from "@/components/molecules/Starter";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { Loader2 } from "lucide-react";
import NoSnippetsFound from "@/components/atoms/NoSnippetsFound";

export default function SnippetGrid() {
  const { snippets, snippetsToShow, isPending, editForm } = useGlobalContext();

  const gridStyles = `${editForm.formState === "Closed" ? "md:grid-cols-2 lg:grid-cols-3 lg:pr-5" : "hidden lg:block lg:grid-cols-1 space-y-4"} w-full grid gap-4 grid-cols-1`;

  return (
    <>
      {isPending && !snippets ? (
        <div className={gridStyles}>
          {[1, 2, 3, 4, 5, 6].map(() => (
            <Skeleton className="w-full h-[380px] flex items-center justify-center">
              <Loader2 className="size-10 animate-spin text-indigo-200" />
            </Skeleton>
          ))}
        </div>
      ) : snippets && snippets.length === 0 ? (
        <Starter />
      ) : snippetsToShow?.length === 0 ? (
        <NoSnippetsFound />
      ) : (
        <div className={gridStyles}>
          {snippetsToShow &&
            snippetsToShow.map((snippet) => <SnippetCard snippet={snippet} />)}
        </div>
      )}
    </>
  );
}

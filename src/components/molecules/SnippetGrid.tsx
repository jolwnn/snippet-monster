"use client";
import { Loader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { SnippetCard } from "./SnippetCard";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import Starter from "./Starter";

export default function SnippetGrid() {
  const { snippets, isPending, editForm } = useGlobalContext();

  const gridStyles = `${editForm.formState === "Create" ? "md:grid-cols-2 lg:grid-cols-3 lg:pr-20" : "hidden lg:block lg:grid-cols-1 space-y-4"} w-full grid gap-4 grid-cols-1`;

  return (
    <>
      {isPending ? (
        <div className={gridStyles}>
          {[1, 2, 3, 4, 5, 6].map(() => (
            <Skeleton className="w-full h-[380px] flex items-center justify-center">
              <Loader2 className="size-10 animate-spin text-indigo-200" />
            </Skeleton>
          ))}
        </div>
      ) : snippets.length === 0 ? (
        <Starter />
      ) : (
        <div className={gridStyles}>
          {snippets.map((snippet) => (
            <SnippetCard snippet={snippet} />
          ))}
        </div>
      )}
    </>
  );
}

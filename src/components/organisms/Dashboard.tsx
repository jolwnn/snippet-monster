"use client";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import SnippetGrid from "@/components/molecules/SnippetGrid";
import { SnippetForm } from "@/components/molecules/SnippetForm";
import SnippetPreview from "../molecules/SnippetPreview";
import { Heart, Sparkles } from "lucide-react";
import { TagsDisplay } from "../molecules/TagsDisplay";

export default function Dashboard() {
  const { editForm, tab } = useGlobalContext();

  return (
    <main>
      {editForm.formState === "Closed" ? (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex flex-col items-start gap-0">
            <span className="flex gap-1">
              <Sparkles className="size-4 mt-1 ml-1 text-muted-foreground" />
              <span className="text-sm font-semibold text-muted-foreground">
                Tags
              </span>
              <span className="text-sm text-muted-foreground">
                (Select to filter snippets)
              </span>
            </span>
            <TagsDisplay />
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold md:text-2xl text-indigo-950/80">
              {tab === "all" ? "All Snippets" : "Favourites"}
            </h1>
            {tab === "all" ? (
              <img src="/rocket.svg" alt="rocket" className="size-7 pt-1" />
            ) : (
              <Heart className="size-6 text-indigo-950/70" fill="pink" />
            )}
          </div>
          <SnippetGrid />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-0 w-full">
          <div className="flex flex-1 flex-col gap-4 lg:p-3 lg:border-r">
            <SnippetPreview />
            <SnippetGrid />
          </div>
          <div className="col-span-3 p-3 lg:col-span-2">
            <SnippetForm />
          </div>
        </div>
      )}
    </main>
  );
}

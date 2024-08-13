"use client";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import SnippetGrid from "@/components/molecules/SnippetGrid";
import { SnippetForm } from "@/components/molecules/SnippetForm";
import SnippetPreview from "../molecules/SnippetPreview";

export default function Dashboard() {
  const { editForm } = useGlobalContext();

  return (
    <main>
      {editForm.formState === "Closed" ? (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">All Snippets</h1>
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

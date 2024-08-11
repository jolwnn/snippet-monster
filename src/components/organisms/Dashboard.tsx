"use client";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import SnippetGrid from "../molecules/SnippetGrid";

export default function Dashboard() {
  const { editForm } = useGlobalContext();

  return (
    <main>
      {editForm.formState === "Create" ? (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">All Snippets</h1>
          </div>
          <SnippetGrid />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-0 w-full">
          <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6 border-r">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-lg">
                Past Snippets
              </h1>
            </div>
            <SnippetGrid />
          </div>
          <div className="col-span-2"></div>
        </div>
      )}
    </main>
  );
}

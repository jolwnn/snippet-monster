import { useGlobalContext } from "@/hooks/useGlobalContext";
import { SnippetCard } from "./SnippetCard";

export default function SnippetPreview() {
  const { editForm } = useGlobalContext();
  return (
    <span className="hidden lg:block border-indigo-500/90 rounded-lg border">
      <SnippetCard snippet={editForm.snippet} />
    </span>
  );
}

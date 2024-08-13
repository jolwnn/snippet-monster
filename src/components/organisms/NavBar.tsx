import { Plus, LayoutGrid, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { createNewSnippet } from "@/lib/actions";

export default function NavBar() {
  const { editForm, setEditForm } = useGlobalContext();

  function handleCreateSnippet() {
    createNewSnippet().then((res) => {
      if (res.data) {
        setEditForm({ formState: "Create", snippet: res.data });
      } else {
        console.error(res.error);
      }
    });
  }
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Button
        className="my-4 mx-2"
        onClick={handleCreateSnippet}
        disabled={editForm.formState === "Create"}
      >
        <Plus className="size-4 pt-0.5 mr-2" />
        Create a New Snippet
      </Button>
      <Button
        variant="ghost"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <LayoutGrid className="size-4" />
        All Snippets
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          0
        </Badge>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Heart className="size-4" />
        Favourites
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          0
        </Badge>
      </Button>
    </nav>
  );
}

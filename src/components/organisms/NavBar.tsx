import TagManager from "@/components/molecules/TagManager";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/config/db";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { createNewSnippet } from "@/lib/actions";
import { Heart, LayoutGrid, LogOut, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const { snippets, editForm, setEditForm, tab, setTab, stepper, setStepper } =
    useGlobalContext();

  function handleCreateSnippet() {
    createNewSnippet().then((res) => {
      if (res.data) {
        setStepper(stepper + 1); // To trigger re-render of snippet grid
        setEditForm({ formState: "Create", snippet: res.data });
      } else {
        console.error(res.error);
      }
    });
  }

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      return;
    }
    navigate("/");
  }

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Button
        className="my-4 mx-2"
        onClick={handleCreateSnippet}
        disabled={editForm.formState === "Create"}
      >
        <Plus className="size-4 py-0.5 mr-2" />
        Create a New Snippet
      </Button>
      <span className="text-indigo-950/90 text-left px-3 mt-4">Views</span>
      <Button
        variant="ghost"
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${tab === "all" ? "bg-indigo-50" : ""}`}
        onClick={() => {
          setTab("all");
        }}
      >
        <LayoutGrid className="size-4" />
        All Snippets
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-950">
          {snippets?.length ?? 0}
        </Badge>
      </Button>
      <Button
        variant="ghost"
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${tab === "favourites" ? "bg-indigo-50" : ""}`}
        onClick={() => {
          setTab("favourites");
        }}
      >
        <Heart className="size-4" />
        Favourites
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink-200 text-black hover:bg-pink-300">
          {snippets?.filter((snippet) => snippet.favourite).length ?? 0}
        </Badge>
      </Button>
      <span className="text-indigo-950/90 text-left px-3 mt-6">More</span>
      <TagManager />
      <Button
        variant="ghost"
        className={`flex items-center justify-start gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
        onClick={() => signOutUser()}
      >
        <LogOut className="size-4" />
        Log Out
      </Button>
    </nav>
  );
}

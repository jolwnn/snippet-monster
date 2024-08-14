import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { createNewSnippet } from "@/lib/actions";

export default function Starter() {
  const { editForm, setEditForm, stepper, setStepper } = useGlobalContext();
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
  return (
    <div
      className={`flex flex-1 items-center justify-center rounded-lg border shadow-sm mx-2 py-28 ${editForm.formState === "Closed" ? "" : "hidden"}`}
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have no code snippets
        </h3>
        <p className="text-sm text-muted-foreground">
          Ready, Set, Code! Create Your First Code Snippet Today
        </p>
        <Button className="mt-4" onClick={handleCreateSnippet}>
          <Plus className="size-4 pt-0.5 mr-2" />
          Create a New Snippet
        </Button>
      </div>
    </div>
  );
}

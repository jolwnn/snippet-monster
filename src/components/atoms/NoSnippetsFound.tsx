import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { createNewSnippet } from "@/lib/actions";
import { Plus } from "lucide-react";

export default function NoSnippetsFound() {
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
      <div className="flex flex-col items-center gap-2 text-center p-4">
        <span className="flex gap-2 items-center p-2">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight">
            No code snippets found
          </h3>
          <img src="/sadmonster.svg" alt="sad" className="size-7 pt-" />
        </span>
        <p className="text-sm text-muted-foreground">
          Create a new code snippet?
        </p>
        <Button className="mt-4" onClick={handleCreateSnippet}>
          <Plus className="size-4 pt-0.5 mr-2" />
          Create a New Snippet
        </Button>
      </div>
    </div>
  );
}

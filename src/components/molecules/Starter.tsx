import { Plus } from "lucide-react";
import { Button } from "../ui/button";

export default function Starter() {
  return (
    <div
      className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have no code snippets
        </h3>
        <p className="text-sm text-muted-foreground">
          Ready, Set, Code! Create Your First Code Snippet Today
        </p>
        <Button className="mt-4">
          <Plus className="size-4 pt-0.5 mr-2" />
          Create a New Snippet
        </Button>
      </div>
    </div>
  );
}

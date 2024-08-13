import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { deleteTag } from "@/lib/actions";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";

export function DeleteTag({ id }: { id: string }) {
  const { tagStepper, setTagStepper } = useGlobalContext();
  function handleDeleteTag() {
    deleteTag(id).then((res) => {
      if (res.error) {
        console.error(res.error);
      } else {
        setTagStepper(tagStepper + 1); // To trigger re-render of snippet grid
      }
    });
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash className="font-semibold text-pink-500/50 size-4 hover:text-pink-600/80 cursor-pointer" />
          <span className="sr-only">Delete tag</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()} className="pb-4">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this tag
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="py-1.5 px-2.5 h-auto">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteTag}
            className="py-1.5 px-2.5 h-auto"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

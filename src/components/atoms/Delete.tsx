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
import { deleteSnippet } from "@/lib/actions";
import { Trash } from "lucide-react";

export function Delete({ id }: { id: string }) {
  const { stepper, setStepper } = useGlobalContext();
  function handleDeleteSnippet() {
    deleteSnippet(id).then((res) => {
      if (res.error) {
        console.error(res.error);
      } else {
        setStepper(stepper + 1); // To trigger re-render of snippet grid
      }
    });
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash
          className="font-semibold text-indigo-500/50 size-4 hover:text-indigo-600/80 cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        />
      </AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()} className="pb-4">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            snippet from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="py-1.5 px-2.5 h-auto">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteSnippet}
            className="py-1.5 px-2.5 h-auto"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

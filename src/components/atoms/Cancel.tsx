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
import { X } from "lucide-react";

export function Cancel() {
  const { editForm, setEditForm } = useGlobalContext();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <X className="text-muted-foreground/50 size-5 hover:text-muted-foreground/90 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent
        className="max-w-96 pb-4"
        onClick={(e) => e.stopPropagation()}
      >
        <AlertDialogHeader>
          <AlertDialogTitle> Warning!</AlertDialogTitle>
          <AlertDialogDescription>
            You may lose all unsaved changes.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex sm:justify-between">
          <AlertDialogCancel className="py-1.5 px-2.5 h-auto">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => setEditForm({ ...editForm, formState: "Closed" })}
            className="py-1.5 px-2.5 h-auto"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

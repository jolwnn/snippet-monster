import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Tags } from "lucide-react";
import { DeleteTag } from "../atoms/DeleteTag";
import { Badge } from "../ui/badge";
import { EditTagsDialog } from "./EditTagsDialog";
import { TagsDialog } from "./TagsDialog";
import { ScrollArea } from "../ui/scroll-area";

export default function TagManager() {
  const { tags } = useGlobalContext();
  return (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
          onClick={() => {}}
        >
          <Tags className="size-4" />
          Manage Tags
          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-transparent text-muted-foreground hover:bg-muted">
            {tags?.length ?? 0}
          </Badge>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="font-bold text-xl mt-2 flex items-center gap-2">
              <Tags className="size-4" /> Tags
            </DialogTitle>
            <span className="px-6">
              <TagsDialog />
            </span>
          </div>
          <DialogDescription className="text-muted-foreground px-2 text-sm">
            Edit or delete tags used across your snippets.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="grid gap-2 md:max-h-[55vh] mx-2 pb-2">
          {tags?.map((tag) => (
            <div className="grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-2 rounded-md border border-slate-300 hover:bg-muted mr-4 mb-2">
              <Badge
                key={tag.id}
                variant="secondary"
                className={`text-[12px] bg-${tag.colour ?? "indigo"}-100 text-${tag.colour ?? "indigo"}-700 h-auto py-1 rounded-full whitespace-nowrap w-auto cursor-pointer`}
              >
                {tag.name}
              </Badge>
              <div className="flex items-center gap-2">
                <EditTagsDialog tag={tag} />
                <DeleteTag id={tag.id} />
              </div>
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { TagsDialog } from "@/components/molecules/TagsDialog";

export function TagsDisplay() {
  const { tags, selectedTag, setSelectedTag } = useGlobalContext();

  return (
    <div className="flex items-center justify-center">
      <ScrollArea className="max-w-[90vw] lg:max-w-[90vw] max-h-28 md:max-h-40 rounded-md overflow-y-auto">
        <div className="flex flex-wrap gap-2 p-4">
          <TagsDialog />
          {tags?.map((tag) => {
            const badgeStyle =
              selectedTag === tag.id
                ? `bg-secondary/50 text-[13px] font-bold border border-slate-200 hover:border-slate-400`
                : `text-[12px] bg-${tag.colour ?? "indigo"}-100`;

            return (
              <Badge
                key={tag.id}
                variant="secondary"
                className={`${badgeStyle} text-${tag.colour ?? "indigo"}-700 h-auto py-1 rounded-full whitespace-nowrap cursor-pointer`}
                onClick={() => {
                  if (selectedTag === tag.id) {
                    setSelectedTag(null);
                  } else {
                    setSelectedTag(tag.id);
                  }
                }}
              >
                {tag.name}
              </Badge>
            );
          })}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}

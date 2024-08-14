import CodeBlock from "@/components/atoms/CodeBlock";
import { Delete } from "@/components/atoms/Delete";
import LanguageIcon from "@/components/atoms/LanguageIcon";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DEFAULT_LANGUAGES_NAMES } from "@/config/constants";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { LanguageType } from "@/types/constants";
import { SnippetType } from "@/types/dbtypes";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import relativeTime from "dayjs/plugin/relativeTime";
import { History } from "lucide-react";
import Favourite from "../atoms/Favourite";

// Extend dayjs with the required plugins
dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export function SnippetCard({ snippet }: { snippet: SnippetType }) {
  const { setEditForm, tagIdMap } = useGlobalContext();

  const handleClick = () => {
    setEditForm({ formState: "Update", snippet });
  };

  const cardStyles =
    "flex flex-col p-4 gap-4 w-full h-[380px] transition-transform transform hover:scale-105 hover:border-indigo-600";
  const cardHeaderStyles =
    "flex flex-col gap-0 w-full items-start justify-start p-1";
  const cardTitleStyles = `text-lg font-semibold text-left ${(!snippet.title || snippet?.title === "") && "text-muted-foreground/50"}`;
  const cardDescriptionStyles = `text-xs text-muted-foreground text-left line-clamp-4 overflow-hidden ${(!snippet.description || snippet?.description === "") && "italic"}`;
  const badgeStyles =
    "text-[10px] bg-indigo-100 text-indigo-700 py-0.5 rounded-full";
  const cardContentStyles = "p-0 flex-grow overflow-hidden";

  function getDisplayDate({
    date,
    type,
  }: {
    date: dayjs.Dayjs;
    type: "created" | "updated";
  }) {
    // Check if the date is less than 24 hours ago
    const now = dayjs();
    if (now.diff(date, "hours") < 24) {
      return (type === "created" ? "Created " : "Updated ") + date.fromNow(); // e.g., '2 hours ago'
    } else {
      return (
        (type === "created" ? "Created on " : "Updated on ") +
        date.format("MMM D")
      ); // e.g., 'Aug 7'
    }
  }

  return (
    <Card className={cardStyles} onClick={handleClick}>
      <CardHeader className={cardHeaderStyles}>
        <span className="flex w-full items-center justify-between">
          <CardTitle
            className={cardTitleStyles}
            onClick={(e) => e.stopPropagation()}
          >
            {!snippet.title || snippet?.title === ""
              ? "Untitled Snippet"
              : snippet.title}
          </CardTitle>
          <Favourite snippet={snippet} />
        </span>
        <div
          className="flex items-center gap-1 pb-1"
          onClick={(e) => e.stopPropagation()}
        >
          <History className="font-semibold text-muted-foreground/50 size-3" />
          <span className="text-xs text-muted-foreground text-left">
            {getDisplayDate({
              date: dayjs(snippet.updated_at),
              type: "updated",
            })}
          </span>
        </div>
        <div
          className="flex flex-wrap gap-1 py-1"
          onClick={(e) => e.stopPropagation()}
        >
          {!snippet.tags ||
            (snippet.tags?.length === 0 && (
              <Badge
                key={0}
                variant="outline"
                className="text-[10px] py-0.5 rounded-full border-indigo-500 text-indigo-500"
              >
                No Tags
              </Badge>
            ))}
          {snippet.tags?.map((id) => {
            const tag = tagIdMap?.get(id);
            return !tag ? (
              <></>
            ) : (
              <Badge key={tag.id} variant="secondary" className={badgeStyles}>
                {tag.name}
              </Badge>
            );
          })}
        </div>
        <CardDescription
          className={cardDescriptionStyles}
          onClick={(e) => e.stopPropagation()}
        >
          {!snippet.description || snippet?.description === ""
            ? "No description provided."
            : snippet.description}
        </CardDescription>
      </CardHeader>
      <CardContent
        className={cardContentStyles}
        onClick={(e) => e.stopPropagation()}
      >
        <CodeBlock
          code={snippet.code ?? ""}
          language={snippet.language ?? "javascript"}
        />
      </CardContent>
      <CardFooter className="w-full border-t border-muted-foreground/ flex justify-between items-center p-0 pt-3">
        <span
          className="flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <LanguageIcon
            language={(snippet.language as LanguageType) ?? "javascript"}
          />
          <span className="text-xs text-muted-foreground font-semibold">
            {
              DEFAULT_LANGUAGES_NAMES[
                (snippet.language as LanguageType) ?? "javascript"
              ]
            }
          </span>
        </span>
        <Delete id={snippet.id} />
      </CardFooter>
    </Card>
  );
}

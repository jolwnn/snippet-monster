import CodeBlock from "@/components/atoms/CodeBlock";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { SnippetType } from "@/types/dbtypes";
import { tomorrowNightEighties } from "react-syntax-highlighter/dist/cjs/styles/hljs";

// Tailwind CSS Classes for Styling
const cardStyles =
  "flex flex-col p-4 gap-4 w-full h-[380px] transition-transform transform hover:scale-105";
const cardHeaderStyles =
  "flex flex-col gap-1 w-full items-start justify-start p-1";
const cardTitleStyles = "text-lg font-semibold text-left";
const cardDescriptionStyles =
  "text-xs text-muted-foreground text-left line-clamp-4 overflow-hidden";
const badgeStyles =
  "text-[10px] bg-indigo-100 text-indigo-700 py-0.5 rounded-full";
const cardContentStyles = "p-0 flex-grow overflow-hidden";

// Component Function
export function SnippetCard({ snippet }: { snippet: SnippetType }) {
  const { tagIdMap } = useGlobalContext();
  return (
    <Card className={cardStyles}>
      <CardHeader className={cardHeaderStyles}>
        <CardTitle className={cardTitleStyles}>{snippet.title}</CardTitle>
        <span className="flex flex-wrap gap-1">
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
        </span>
        <CardDescription className={cardDescriptionStyles}>
          {snippet.description}
        </CardDescription>
      </CardHeader>
      <CardContent className={cardContentStyles}>
        <CodeBlock
          code={snippet.code ?? ""}
          language={snippet.language?.toLowerCase() ?? "javascript"}
          style={tomorrowNightEighties}
        />
      </CardContent>
    </Card>
  );
}

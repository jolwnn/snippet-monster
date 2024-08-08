import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SnippetType } from "@/types/snippets";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import CodeBlock from "../atoms/CodeBlock";
import { Badge } from "../ui/badge";

// Tailwind CSS Classes for Styling
const cardStyles =
  "flex flex-col p-4 gap-4 w-full h-[400px] transition-transform transform hover:scale-105 shadow-lg";
const cardHeaderStyles =
  "flex flex-col gap-2 w-full items-start justify-start p-2";
const cardTitleStyles = "text-lg font-semibold text-left";
const cardDescriptionStyles =
  "text-sm text-muted-foreground text-left line-clamp-4 overflow-hidden";
const badgeStyles = "text-xs bg-blue-100 text-blue-700 rounded-md px-2 py-1";
const cardContentStyles = "p-0 flex-grow overflow-hidden";

// Component Function
export function SnippetCard({ snippet }: { snippet: SnippetType }) {
  return (
    <Card className={cardStyles}>
      <CardHeader className={cardHeaderStyles}>
        <Badge variant="secondary" className={badgeStyles}>
          {snippet.language ?? "JavaScript"}
        </Badge>
        <CardTitle className={cardTitleStyles}>{snippet.title}</CardTitle>
        <CardDescription className={cardDescriptionStyles}>
          {snippet.description}
        </CardDescription>
      </CardHeader>
      <CardContent className={cardContentStyles}>
        <CodeBlock
          code={snippet.code ?? ""}
          language={snippet.language?.toLowerCase() ?? "javascript"}
          style={vs}
        />
      </CardContent>
    </Card>
  );
}

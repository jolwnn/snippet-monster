import * as React from "react";

import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";

type Props = {
  code: string;
  language: string;
  style: { [key: string]: React.CSSProperties };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function CodeBlock({ code, language, style }: Props) {
  return (
    <SyntaxHighlighter
      language={language}
      style={atelierCaveLight}
      wrapLines={true}
      wrapLongLines={true}
      showLineNumbers={true}
      showInlineLineNumbers={false}
      className="rounded-sm p-4 max-h-full w-full overflow-y-auto text-sm"
    >
      {code}
    </SyntaxHighlighter>
  );
}

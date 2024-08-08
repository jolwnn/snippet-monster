import * as React from "react";

import SyntaxHighlighter from "react-syntax-highlighter";

type Props = {
  code: string;
  language: string;
  style: { [key: string]: React.CSSProperties };
};

export default function CodeBlock({ code, language, style }: Props) {
  return (
    <SyntaxHighlighter
      language={language}
      style={style}
      wrapLines={true}
      wrapLongLines={true}
      showLineNumbers={true}
      showInlineLineNumbers={false}
      className="rounded-md p-4 bg-gray-200 max-h-full w-fulloverflow-y-auto"
    >
      {code}
    </SyntaxHighlighter>
  );
}

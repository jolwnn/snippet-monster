import { Copy } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";

type Props = {
  code: string;
};
function CopyButton({ code }: Props) {
  return (
    <button>
      <CopyToClipboard text={code} onCopy={() => alert("Copied!")}>
        <div>
          <Copy />
        </div>
      </CopyToClipboard>
    </button>
  );
}

export default CopyButton;

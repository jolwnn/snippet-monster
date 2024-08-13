import { useGlobalContext } from "@/hooks/useGlobalContext";
import { updateSnippetLiked } from "@/lib/actions";
import { SnippetType } from "@/types/dbtypes";
import { Heart } from "lucide-react";

export default function Favourite({ snippet }: { snippet: SnippetType }) {
  const { stepper, setStepper } = useGlobalContext();

  function handleLike() {
    updateSnippetLiked(snippet.id, !snippet.favourite).then((res) => {
      if (res.error) {
        console.error(res.error);
      } else {
        setStepper(stepper + 1); // To trigger re-render of snippet grid
      }
    });
  }

  return (
    <Heart
      fill={snippet.favourite ? "pink" : "transparent"}
      className="size-5 hover:text-indigo-600/90 text-indigo-600/60 cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
    />
  );
}

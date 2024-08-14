import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useGlobalContext } from "@/hooks/useGlobalContext";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useGlobalContext();
  return (
    <div className="relative flex items-center justify-center">
      <Search className="absolute left-2.5 size-4 text-indigo-500/80" />
      <Input
        type="search"
        placeholder="Search snippets..."
        className="w-full appearance-none bg-background pl-8 shadow-none rounded-full focus-visible:ring-1 focus-visible:ring-indigo-500"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
    </div>
  );
}

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DEFAULT_LANGUAGES, DEFAULT_LANGUAGES_NAMES } from "@/config/constants";
import { cn } from "@/lib/utils";
import { LanguageType } from "@/types/constants";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import LanguageIcon from "./LanguageIcon";
import { useGlobalContext } from "@/hooks/useGlobalContext";

export function LanguageSelector() {
  const { editForm, setEditForm } = useGlobalContext();
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-auto px-2 py-1 justify-between"
        >
          <span className="text-xs">
            {
              DEFAULT_LANGUAGES_NAMES[
                (editForm.snippet.language as LanguageType) ?? "javascript"
              ]
            }
          </span>
          <ChevronsUpDown className="ml-2 size-3 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {DEFAULT_LANGUAGES.map((lang) => (
                <CommandItem
                  key={lang}
                  value={lang}
                  onSelect={(chosen) => {
                    setEditForm({
                      ...editForm,
                      snippet: {
                        ...editForm.snippet,
                        language: chosen as LanguageType,
                      },
                    });
                    setOpen(false);
                  }}
                >
                  <span className="flex items-center gap-3">
                    <LanguageIcon language={lang as LanguageType} />
                    {DEFAULT_LANGUAGES_NAMES[lang as LanguageType]}
                  </span>

                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      lang === (editForm.snippet.language ?? "javascript")
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

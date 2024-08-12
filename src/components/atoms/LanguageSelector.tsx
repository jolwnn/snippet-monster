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
import { languageType } from "@/types/constants";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import LanguageIcon from "./LanguageIcon";

export function LanguageSelector({
  language,
  setLanguage,
}: {
  language: languageType;
  setLanguage: React.Dispatch<React.SetStateAction<languageType>>;
}) {
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
          <span className="text-xs">{DEFAULT_LANGUAGES_NAMES[language]}</span>
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
                    setLanguage(chosen as languageType);
                    setOpen(false);
                  }}
                >
                  <span className="flex items-center gap-3">
                    <LanguageIcon language={lang as languageType} />
                    {DEFAULT_LANGUAGES_NAMES[lang as languageType]}
                  </span>

                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      lang === language ? "opacity-100" : "opacity-0"
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

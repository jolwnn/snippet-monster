import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Book, CheckIcon, Code, Heart, Tags, X } from "lucide-react";

import { Cancel } from "@/components/atoms/Cancel";
import { LanguageSelector } from "@/components/atoms/LanguageSelector";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { updateSnippet } from "@/lib/actions";
import ace from "ace-builds";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import * as React from "react";
import AceEditor from "react-ace";

ace.config.set("basePath", "/node_modules/ace-builds/src-min-noconflict");

export function SnippetForm() {
  const { editForm, setEditForm, tags, tagIdMap, stepper, setStepper } =
    useGlobalContext();
  const [isFocused, setIsFocused] = React.useState(false);

  function handleSaveSnippet() {
    const tagsToSave =
      editForm.snippet?.tags?.filter((id) => tagIdMap?.has(id)) ?? [];
    // To remove tags that are no longer in the database
    updateSnippet({
      ...editForm.snippet,
      tags: tagsToSave,
    }).then((res) => {
      if (res.error) {
        console.error(res.error);
      } else {
        setEditForm({ ...editForm, formState: "Closed" });
        setStepper(stepper + 1); // To trigger re-render of snippet grid
      }
    });
  }

  return (
    <Card className="w-full p-4 pl-2">
      <CardContent className="w-full p-0 pr-2">
        <div className="flex w-full items-center justify-end">
          <Cancel />
        </div>
        <div className="flex flex-col gap-1 items-start w-full">
          <div className="grid grid-cols-12 items-center justify-center w-full">
            <span className="mr-1 md:mr-5 text-right text-lg font-semibold cols-span-1 text-muted-foreground/50">
              T
            </span>
            <div className="col-span-10">
              <Input
                className="w-full rounded-none border-0 border-b-2 focus-visible:border-indigo-500 focus-visible:ring-transparent text-xl font-semibold text-left"
                placeholder="Untitled Snippet"
                value={editForm.snippet?.title ?? ""}
                onChange={(e) => {
                  setEditForm({
                    ...editForm,
                    snippet: {
                      ...editForm.snippet,
                      title: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="flex col-span-1 justify-end items-center">
              <Heart
                fill={editForm.snippet.favourite ? "pink" : "transparent"}
                className="size-5 hover:text-indigo-600/90 text-indigo-600/60 cursor-pointer"
                onClick={() => {
                  setEditForm({
                    ...editForm,
                    snippet: {
                      ...editForm.snippet,
                      favourite: !editForm.snippet.favourite,
                    },
                  });
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 items-center justify-center w-full">
            <span className="flex cols-span-1 justify-end items-start h-full">
              <Tags className="text-muted-foreground/50 size-4 mr-4 ml-2 mt-3 hidden md-block" />
            </span>
            <div className="flex col-span-11 p-2 flex-wrap gap-1">
              {editForm.snippet?.tags?.map((id) => {
                const tag = tagIdMap?.get(id);
                return !tag ? (
                  <></>
                ) : (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className={`text-[10px] bg-${tag.colour ?? "indigo"}-100 text-${tag.colour ?? "indigo"}-700 py-0.5 rounded-full flex items-center gap-1`}
                  >
                    {tag.name}
                    <X
                      className={`h-3 text-${tag.colour ?? "indigo"}-700 hover:text-${tag.colour ?? "indigo"}-900`}
                      onClick={() => {
                        setEditForm({
                          ...editForm,
                          snippet: {
                            ...editForm.snippet,
                            tags:
                              editForm.snippet.tags?.filter(
                                (id) => id !== tag.id
                              ) ?? [],
                          },
                        });
                      }}
                    />
                  </Badge>
                );
              })}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="whitespace-nowrap text-xs rounded-full px-2.5 py-0.5 h-auto"
                  >
                    + Add Tag
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search tags..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No tags found.</CommandEmpty>
                      <CommandGroup>
                        {tags?.map((tag) => (
                          <CommandItem
                            value={tag.name ?? ""}
                            key={tag.id}
                            disabled={editForm.snippet.tags?.includes(tag.id)}
                            onSelect={() => {
                              setEditForm({
                                ...editForm,
                                snippet: {
                                  ...editForm.snippet,
                                  tags: [
                                    ...(editForm.snippet.tags ?? []),
                                    tag.id,
                                  ],
                                },
                              });
                            }}
                          >
                            <Badge
                              key={tag.id}
                              variant="secondary"
                              className={`bg-${tag.colour}-100 px-3 py-0.5 text-${tag.colour}-700 rounded-full`}
                            >
                              {tag.name}
                            </Badge>
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                editForm.snippet.tags?.includes(tag.id)
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
            </div>
          </div>

          <div className="grid grid-cols-12 items-center justify-center w-full mt-4">
            <span className="flex cols-span-1 justify-end items-start h-full">
              <Book className="text-muted-foreground/50 size-4 mr-4 ml-2 mt-3 hidden md:block" />
            </span>
            <div className="col-span-11">
              <Textarea
                className="rounded-sm border bg-white px-4 py-3 mr-2 focus-visible:ring-transparent focus-visible:border-indigo-500"
                placeholder="Enter notes or describe your code snippet here"
                rows={5}
                value={editForm.snippet?.description ?? ""}
                onChange={(e) => {
                  setEditForm({
                    ...editForm,
                    snippet: {
                      ...editForm.snippet,
                      description: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 items-center justify-center w-full mt-4">
            <span className="flex cols-span-1 justify-end items-start h-full">
              <Code className="text-muted-foreground/50 size-4 mr-4 ml-2 mt-3 hidden md:block" />
            </span>
            <div
              className={`col-span-11 rounded-sm border ${
                isFocused ? "border-indigo-500" : "border-slate-200"
              }`}
            >
              <div className="text-base p-4 flex flex-col gap-4 justify-start items-start">
                <span>
                  <span className="text-muted-foreground/50 font-semibold text-xs mr-2">
                    Select Language:
                  </span>
                  <LanguageSelector />
                </span>
                <AceEditor
                  placeholder="Paste your code here!"
                  mode={editForm.snippet.language ?? "javascript"}
                  theme="tomorrow"
                  width="100%"
                  height="300px"
                  fontSize={14}
                  lineHeight={14}
                  showPrintMargin={false}
                  showGutter={true}
                  highlightActiveLine={false}
                  enableBasicAutocompletion={true}
                  enableLiveAutocompletion={true}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  value={editForm.snippet.code ?? ""}
                  onChange={(newValue) => {
                    setEditForm({
                      ...editForm,
                      snippet: {
                        ...editForm.snippet,
                        code: newValue,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <CardFooter className="flex justify-between p-0 px-2 pt-4">
          <Button
            variant="outline"
            className="py-1.5 px-2.5 h-auto"
            onClick={() => setEditForm({ ...editForm, formState: "Closed" })}
          >
            Cancel
          </Button>
          <Button className="py-1.5 px-2.5 h-auto" onClick={handleSaveSnippet}>
            Save
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

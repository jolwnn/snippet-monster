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
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Book, CheckIcon, Code, Tags } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { LanguageSelector } from "@/components/atoms/LanguageSelector";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { languageType } from "@/types/constants";
import ace from "ace-builds";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import * as React from "react";
import AceEditor from "react-ace";

ace.config.set("basePath", "/node_modules/ace-builds/src-min-noconflict");

export const FormSchema = z.object({
  title: z.string(),
  tags: z.array(z.string()),
  description: z.string(),
  code: z.string(),
});

export function SnippetForm() {
  const { tags, tagIdMap } = useGlobalContext();
  const [isFocused, setIsFocused] = React.useState(false);
  const [language, setLanguage] = React.useState<languageType>("javascript");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "Untitled Snippet",
      tags: [],
      description: "",
      code: "",
    },
  });

  return (
    <Card className="w-full p-4 pl-2">
      <CardContent className="w-full p-0 pr-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => {})} className="w-full">
            <div className="flex flex-col gap-1 items-start w-full">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-12 items-center justify-center w-full">
                    <span className="mr-5 text-right text-lg font-semibold cols-span-1 text-muted-foreground/50">
                      T
                    </span>
                    <FormControl className="col-span-11">
                      <Input
                        className="w-full rounded-none border-0 border-b-2 focus-visible:border-indigo-500 focus-visible:ring-transparent text-xl font-semibold text-left"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-12 items-center justify-center w-full">
                    <span className="flex cols-span-1 justify-end items-start h-full">
                      <Tags className="font-semibold text-muted-foreground/50 size-4 mr-4 ml-2 mt-4" />
                    </span>
                    <div className="flex col-span-11 p-2 flex-wrap gap-1">
                      {form.getValues("tags")?.map((id) => {
                        const tag = tagIdMap?.get(id);
                        return !tag ? (
                          <></>
                        ) : (
                          <Badge
                            key={tag.id}
                            variant="secondary"
                            className="text-[10px] bg-indigo-100 text-indigo-700 py-0.5 rounded-full"
                          >
                            {tag.name}
                          </Badge>
                        );
                      })}
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="whitespace-nowrap text-xs rounded-full px-2.5 py-0.5 h-auto"
                            >
                              + Add Tag
                            </Button>
                          </FormControl>
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
                                    value={tag.id}
                                    key={tag.id}
                                    onSelect={() => {
                                      form.setValue("tags", [
                                        ...form.getValues("tags"),
                                        tag.id,
                                      ]);
                                    }}
                                  >
                                    {tag.name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        field.value.includes(tag.id)
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
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-12 items-center justify-center w-full mt-4">
                    <span className="flex cols-span-1 justify-end items-start h-full">
                      <Book className="font-semibold text-muted-foreground/50 size-4 mr-4 ml-2 mt-3" />
                    </span>
                    <FormControl className="col-span-11">
                      <Textarea
                        className="rounded-sm border bg-white px-4 py-3 mr-2 focus-visible:ring-transparent focus-visible:border-indigo-500"
                        placeholder="Enter notes or describe your code snippet here"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-12 items-center justify-center w-full mt-4">
                    <span className="flex cols-span-1 justify-end items-start h-full">
                      <Code className="font-semibold text-muted-foreground/50 size-4 mr-4 ml-2 mt-3" />
                    </span>
                    <FormControl
                      className={`col-span-11 rounded-sm border ${
                        isFocused ? "border-indigo-500" : "border-slate-200"
                      }`}
                    >
                      <div className="text-base p-4 flex flex-col gap-4 justify-start items-start">
                        <span>
                          <span className="text-muted-foreground/50 font-semibold text-xs mr-2">
                            Select Language:
                          </span>
                          <LanguageSelector
                            language={language}
                            setLanguage={setLanguage}
                          />
                        </span>
                        <AceEditor
                          placeholder="Paste your code here!"
                          mode={language}
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
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="flex justify-end p-0 px-2 pt-4">
              <Button type="submit" className="py-1.5 px-2.5 h-auto">
                Save
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { DEFAULT_COLOURS } from "@/config/constants";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { updateTag } from "@/lib/actions";
import { TagType } from "@/types/dbtypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen, Tag } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const FormSchema = z.object({
  name: z
    .string({
      required_error: "Please enter a name.",
    })
    .min(1, "Please enter a name."),
  colour: z.string({
    required_error: "Please select a colour.",
  }),
});

export function EditTagsDialog({ tag }: { tag: TagType }) {
  const { tagStepper, setTagStepper } = useGlobalContext();
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: tag.name ?? "",
      colour: tag.colour ?? "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    updateTag({ id: tag.id, ...data }).then((res) => {
      if (res.error) {
        console.error(res.error);
      } else {
        setTagStepper(tagStepper + 1); // To trigger re-render of tags components
      }
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <SquarePen className="font-semibold text-indigo-500/50 size-4 hover:text-indigo-600/80 cursor-pointer" />
          <span className="sr-only">Edit tag</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col gap-6 p-6">
        <DialogHeader>
          <DialogTitle className="font-bold mt-2 flex items-center gap-2">
            <Tag className="size-4" /> Add New Tag
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-5 gap-2 mb-6 px-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1 col-span-3">
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Label"
                        {...field}
                        className="focus-visible:border-indigo-500 focus-visible:ring-transparent rounded-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="colour"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <span className="flex flex-col gap-1 w-full">
                        <FormControl>
                          <SelectTrigger className="focus:ring-1 focus:ring-indigo-500 rounded-sm">
                            <SelectValue placeholder="Select a colour" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent
                          side="right"
                          className="col-span-2 flex flex-col gap-0 items-start h-[200px]"
                        >
                          <SelectGroup>
                            <SelectLabel>Colours</SelectLabel>

                            {DEFAULT_COLOURS.map((colour) => (
                              <SelectItem value={colour} key={colour}>
                                <Badge
                                  key={colour}
                                  variant="secondary"
                                  className={`text-[12px] bg-${colour}-100 px-3 py-0 text-${colour}-700 rounded-full`}
                                >
                                  {colour}
                                </Badge>
                              </SelectItem>
                            ))}
                            <Separator />
                          </SelectGroup>
                        </SelectContent>
                        <FormMessage />
                      </span>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                className="py-1.5 px-2.5 h-auto"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button className="py-1.5 px-2.5 h-auto" type="submit">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

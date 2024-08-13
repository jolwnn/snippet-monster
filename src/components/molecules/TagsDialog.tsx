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
  FormLabel,
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
import { createTag } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tag } from "lucide-react";
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

export function TagsDialog() {
  const { tagStepper, setTagStepper } = useGlobalContext();
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    createTag(data).then((res) => {
      if (res.data) {
        setTagStepper(tagStepper + 1); // To trigger re-render of tags components
      } else {
        console.error(res.error);
      }
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full py-1 px-3.5 h-auto text-sm">
          +{"  "}Add Tag
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-4">
        <DialogHeader>
          <DialogTitle className="font-bold mt-2 flex items-center gap-2">
            <Tag className="size-4" /> Add New Tag
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2 pb-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center pr-4">
                    <FormLabel className="text-muted-foreground font-normal text-center">
                      Name
                    </FormLabel>
                    <span className="col-span-3 ml-1 flex flex-col gap-1">
                      <FormControl>
                        <Input
                          id="name"
                          {...field}
                          className="col-span-3 focus-visible:border-indigo-500 focus-visible:ring-transparent rounded-sm"
                        />
                      </FormControl>{" "}
                      <FormMessage />
                    </span>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="colour"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center">
                    <FormLabel className="text-muted-foreground font-normal text-center">
                      Colour
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <span className="col-span-2">
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

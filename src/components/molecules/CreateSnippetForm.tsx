import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Textarea } from "../ui/textarea";

export const FormSchema = z.object({
  title: z.string(),
  description: z.string(),
  code: z.string(),
});

// add tags later on

export function CreateSnippetForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { title: "Untitled Snippet", description: "", code: "" },
  });
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex gap-1 items-center hover:scale-95">
          <Plus className="size-4" strokeWidth={3} />
          <span className="text-lg">Create</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-full lg:max-w-[50vw]">
        <SheetHeader>
          <SheetTitle>Create Code Snippet</SheetTitle>
          <SheetDescription>
            Create a code snippet here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => {})}>
            <div className="grid gap-4 py-4 items-center">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-start">
                      <FormLabel className="text-center pt-3 font-lg">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input className="col-span-3" {...field} />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-start">
                      <FormLabel className="text-center pt-3 font-lg">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="rounded-lg borderbg-white px-4 py-3 col-span-3"
                          placeholder="Enter notes or describe your code snippet here"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

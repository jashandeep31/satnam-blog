"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { createNotification } from "@/actions";
import { useRouter } from "next/navigation";

const TYPES = ["UPDATE", "LATEST"] as const;
const formSchema = z.object({
  title: z.string(),
  type: z.enum(TYPES),
  link: z.string().url(),
});

const Page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("createing a notification");
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("type", values.type);
    formData.append("link", values.link);
    const res = await createNotification(formData);
    if (res === "success") {
      toast.success("Notification got create", { id: toastId });
      router.push("/admin/notifications");
    } else {
      toast.error("Notification failed", { id: toastId });
    }
  }

  return (
    <div className="container md:mt-12 mt-6">
      <h1 className="text-lg font-bold">Create Notification</h1>
      <p className="text-muted-foreground text-sm">
        Create a the notification of any certain change
      </p>
      <div className="mt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Admin date of the PSPCL got updated"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the title that you want to show publiciy
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https:/...." {...field} />
                  </FormControl>
                  <FormDescription>
                    Link at which you want to redirect
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the category of the Notification" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TYPES.map((item, index: number) => (
                        <SelectItem key={index} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select under which category notification fall
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button>Send Notification</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;

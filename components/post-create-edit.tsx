"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ckeditor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Plugin,
  ButtonView,
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  CKBox,
  CKBoxImageEdit,
  CloudServices,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Font,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Mention,
  PageBreak,
  Paragraph,
  PasteFromMarkdownExperimental,
  PasteFromOffice,
  PictureEditing,
  RemoveFormat,
  SelectAll,
  ShowBlocks,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";
import { createPost, updatePost } from "@/actions";
import { Post } from "@prisma/client";
const CATEGORIES = [
  "ADMIT_CARD",
  "RESULT",
  "JOB",
  "IMPORTANT",
  "ANSWER_KEY",
] as const;

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long" })
    .max(100, { message: "Title cannot exceed 100 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(500, { message: "Description cannot exceed 500 characters" }),
  tags: z
    .string()
    .min(1, { message: "At least one tag is required" })
    .max(100, { message: "You cannot have more than 10 tags" }),
  keywords: z
    .string()
    .min(1, { message: "Keywords cannot be empty" })
    .max(200, { message: "Keywords cannot exceed 200 characters" }),
  company: z
    .string()
    .min(1, { message: "Company name cannot be empty" })
    .max(100, { message: "Company name cannot exceed 100 characters" }),
  category: z.enum(CATEGORIES),
});

interface IPost extends Post {
  blogBody: any;
}

const PostCreateEdit = ({ post }: { post: null | IPost }) => {
  const [value, setValue] = useState(!post ? "welcome " : post.blogBody.body);

  const defaultValues: {
    title: string;
    company: string;
    description: string;
    tags: string;
    category: (typeof CATEGORIES)[number];
    keywords: string;
  } = !post
    ? {
        title: "PSPCL jobs ",
        company: "PSPCL",
        description: "Govt teacher jobs",
        tags: "20k salary last date 20th",
        category: "JOB",
        keywords: "PSPCL, Govt jobs, 20k salary",
      }
    : {
        title: post.title,
        company: post.company,
        description: post.description,
        tags: post.tags,
        category: post.category as (typeof CATEGORIES)[number],
        keywords: post.keywords,
      };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const id = toast.loading("Creating post...");
    const formData = new FormData();
    (Object.keys(values) as (keyof typeof values)[]).forEach((key) => {
      formData.append(key, values[key]);
    });
    console.log(value);
    formData.append("blog", value);
    if (post) {
      formData.append("id", post.id as string);
      updatePost(formData);
    } else {
      createPost(formData).catch((e) => console.log(e));
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Govt teacher jobs" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the title that you want to show to world
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="PSPCL" {...field} />
                </FormControl>
                <FormDescription>
                  Name of organization like pspcl
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Govt teacher jobs..." {...field} />
                </FormControl>
                <FormDescription>
                  Description of at least 20 words.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder="Tags please" {...field} />
                </FormControl>
                <FormDescription>
                  Tags like: 20k salary , last date 20th
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keywords</FormLabel>
                <FormControl>
                  <Input placeholder="Tags please" {...field} />
                </FormControl>
                <FormDescription>
                  Keywords used by the meta data tags
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the category of the post" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CATEGORIES.map((item, index: number) => (
                      <SelectItem key={index} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Manage the category of hte post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Label className="block mb-2 font-medium"> Detailed post</Label>
            <CKEditor
              editor={ClassicEditor}
              config={{
                toolbar: {
                  items: [
                    "fontColor",
                    "undo",
                    "redo",
                    "|",
                    "aiCommands",
                    "aiAssistant",
                    "|",
                    "showBlocks",
                    "formatPainter",
                    "|",
                    "heading",
                    "style",
                    "|",
                    "fontSize",
                    "fontFamily",
                    "fontColor",
                    "fontBackgroundColor",
                    "|",
                    "bold",
                    "italic",
                    "underline",
                    "|",
                    "link",
                    "insertImage",
                    "insertTable",
                    "highlight",
                    "blockQuote",
                    "codeBlock",
                    "|",
                    "alignment",
                    "|",
                    "bulletedList",
                    "numberedList",
                    "multiLevelList",
                    "todoList",
                    "indent",
                    "outdent",
                  ],
                  shouldNotGroupWhenFull: false,
                },
                plugins: [
                  Plugin,
                  AccessibilityHelp,
                  Alignment,
                  Autoformat,
                  AutoImage,
                  AutoLink,
                  Autosave,
                  BalloonToolbar,
                  BlockQuote,
                  Bold,
                  CKBox,
                  CKBoxImageEdit,
                  CloudServices,
                  Code,
                  CodeBlock,
                  Essentials,
                  FindAndReplace,
                  FontBackgroundColor,
                  Font,
                  FontColor,
                  FontFamily,
                  FontSize,
                  GeneralHtmlSupport,
                  Heading,
                  Highlight,
                  HorizontalLine,
                  HtmlComment,
                  HtmlEmbed,
                  ImageBlock,
                  ImageCaption,
                  ImageInline,
                  ImageInsert,
                  ImageInsertViaUrl,
                  ImageResize,
                  ImageStyle,
                  ImageTextAlternative,
                  ImageToolbar,
                  ImageUpload,
                  Indent,
                  IndentBlock,
                  Italic,
                  Link,
                  LinkImage,
                  List,
                  ListProperties,
                  MediaEmbed,
                  Mention,
                  PageBreak,
                  Paragraph,
                  PasteFromMarkdownExperimental,
                  PasteFromOffice,
                  PictureEditing,
                  RemoveFormat,
                  SelectAll,
                  ShowBlocks,
                  SpecialCharacters,
                  SpecialCharactersArrows,
                  SpecialCharactersCurrency,
                  SpecialCharactersEssentials,
                  SpecialCharactersLatin,
                  SpecialCharactersMathematical,
                  SpecialCharactersText,
                  Strikethrough,
                  Style,
                  Subscript,
                  Superscript,
                  Table,
                  TableCaption,
                  TableCellProperties,
                  TableColumnResize,
                  TableProperties,
                  TableToolbar,
                  TextPartLanguage,
                  TextTransformation,
                  TodoList,
                  Underline,
                  Undo,
                ],
                licenseKey: "<YOUR_LICENSE_KEY>",

                initialData: post ? post.blogBody.body : "",
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log(data);
                setValue(data);
              }}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default PostCreateEdit;

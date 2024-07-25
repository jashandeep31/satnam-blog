"use server";

import { db } from "@/lib/db";
import { State } from "@prisma/client";
import z from "zod";
const CATEGORIES = [
  "ADMIT_CARD",
  "RESULT",
  "JOB",
  "IMPORTANT",
  "ANSWER_KEY",
] as const;

const postValidationSchema = z.object({
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
  state: z
    .string()
    .min(1, { message: "State name cannot be empty" })
    .max(100, { message: "state name cannot exceed 100 characters" }),
});

export async function createPost(formData: FormData): Promise<string> {
  await db.$transaction(async (db) => {
    const validatedData = postValidationSchema.parse({
      title: formData.get("title"),
      description: formData.get("description"),
      tags: formData.get("tags"),
      keywords: formData.get("keywords"),
      company: formData.get("company"),
      category: formData.get("category"),
      state: formData.get("state"),
    });

    console.log(formData.get("blog"));

    const post = await db.post.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        tags: validatedData.tags,
        keywords: validatedData.keywords,
        company: validatedData.company,
        category: validatedData.category,
        stateId: validatedData.state,
      },
    });
    const blog = await db.blogBody.create({
      data: {
        body: (formData.get("blog") as string) ?? "",
        postId: post.id,
      },
    });
  });

  return "success";
}

export async function updatePost(formData: FormData): Promise<string> {
  const id = formData.get("id");
  if (!id) {
    throw new Error("Post ID is required");
  }

  const validatedData = postValidationSchema.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    tags: formData.get("tags"),
    keywords: formData.get("keywords"),
    company: formData.get("company"),
    category: formData.get("category"),
    state: "this",
  });

  await db.$transaction(async (db) => {
    const post = await db.post.update({
      where: {
        id: id as string,
      },
      data: {
        title: validatedData.title,
        description: validatedData.description,
        tags: validatedData.tags,
        keywords: validatedData.keywords,
        company: validatedData.company,
        category: validatedData.category,
      },
    });

    await db.blogBody.update({
      where: {
        postId: post.id,
      },
      data: {
        body: (formData.get("blog") as string) ?? "",
      },
    });
  });
  return "success";
}

export async function createState(
  stateName: string
): Promise<"success" | "error"> {
  try {
    const state = await db.state.create({
      data: {
        name: stateName.toLocaleLowerCase(),
      },
    });
    return "success";
  } catch (error) {
    return "error";
  }
}

export async function getStates(): Promise<State[]> {
  const states = await db.state.findMany();
  return states;
}

export async function createNotification(
  formData: FormData
): Promise<"success" | "error"> {
  try {
    const TYPES = ["UPDATE", "LATEST"] as const;
    const formSchema = z.object({
      title: z.string(),
      type: z.enum(TYPES),
      link: z.string().url(),
    });

    const validatedData = formSchema.safeParse({
      title: formData.get("title"),
      type: formData.get("type"),
      link: formData.get("link"),
    });

    if (validatedData.success) {
      await db.notification.create({
        data: {
          ...validatedData.data,
        },
      });
      return "success";
    }
    return "error";
  } catch (error) {
    return "error";
  }
}

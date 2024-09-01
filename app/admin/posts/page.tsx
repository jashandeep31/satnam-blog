import { db } from "@/lib/db";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const postsFunction = async () => {
  return await db.post.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });
};
const page = async () => {
  const posts = await postsFunction();
  return (
    <div className="container md:mt-12 mt-6">
      <div className="flex justify-between">
        <h1 className="text-xl">Edit posts</h1>
        <Link
          className={cn(buttonVariants({ variant: "link" }))}
          href="/admin/create"
        >
          Create New
        </Link>
      </div>

      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">S.no</TableHead>
              <TableHead className="w-full">Title</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post, index) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{++index}</TableCell>
                <TableCell className="w-full">{post.title}</TableCell>
                <TableCell>
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className={buttonVariants()}
                  >
                    Edit
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;

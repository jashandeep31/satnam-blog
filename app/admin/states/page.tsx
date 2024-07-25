import { db } from "@/lib/db";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const getStates = async () => {
  const states = await db.state.findMany({});
  return states;
};

const page = async () => {
  const states = await getStates();
  return (
    <div className="container md:mt-12 mt-6">
      <h1 className="text-lg font-bold">Manage All States</h1>
      <p className="text-sm text-muted-foreground ">
        Only add state of those you are posting jobs
      </p>
      <div className="my-3 flex justify-end">
        <Link
          href={"/admin/states/create"}
          className={buttonVariants({ variant: "default" })}
        >
          Create State
        </Link>
      </div>
      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">S.no</TableHead>
              <TableHead className="w-full">State Name</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {states.map((post, index) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{++index}</TableCell>
                <TableCell className="w-full capitalize">{post.name}</TableCell>
                <TableCell>
                  <Link
                    href={`#`}
                    className={cn(buttonVariants({}), " opacity-20")}
                  >
                    Not available
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>{" "}
    </div>
  );
};

export default page;

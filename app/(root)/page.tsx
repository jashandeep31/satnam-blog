import { db } from "@/lib/db";
import { Post } from "@prisma/client";
import { Dot, Search } from "lucide-react";
import React from "react";
import Link from "next/link";
import AsideBar from "@/components/aside-bar";

const postsFunction = async () => {
  return await db.post.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });
};
const page = async () => {
  const posts = await postsFunction();
  const Card = ({ post }: { post: Post }) => (
    <Link
      href={`/${post.id}`}
      className="border rounded p-3 flex gap-2 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:scale-[101%] duration-300 "
    >
      <div>
        <div
          className="w-8 h-8 bg-slate-300 rounded-full flex
        items-center justify-center"
        >
          <span className="text-lg font-bold">{post.title[0]}</span>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground italic">{post.company}</p>
        <h3 className="text-lg font-bold">{post.title}</h3>

        <ul className="flex gap-2 flex-wrap text-sm text-muted-foreground mt-3">
          {post.tags.split(",").map((tag) => (
            <li className="flex items-center" key={tag}>
              <Dot className="inline" size={20} /> {tag}
            </li>
          ))}
        </ul>

        <p className=" text-xs text-muted-foreground mt-7 pl-3">
          Updated At: {post.updatedAt.toLocaleDateString()}{" "}
        </p>
      </div>
    </Link>
  );

  return (
    <div className="container md:mt-12 mt-6">
      <div className="grid md:grid-cols-6 gap-6">
        <div className="md:col-span-4">
          <div className="flex gap-2">
            <button className="text-sm border rounded-full px-4 py-1 border-primary text-primary bg-primary/10">
              All
            </button>
            <button className="text-sm border rounded-full px-4 py-1 text-muted-foreground hover:border-primary duration-300 hover:text-primary">
              Admin Cards
            </button>
          </div>

          <div className="mt-6 grid gap-3">
            {posts.map((post: Post) => (
              <Card key={post.id} post={post} />
            ))}
          </div>
        </div>
        <AsideBar />
      </div>
    </div>
  );
};

export default page;

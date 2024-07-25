import { db } from "@/lib/db";
import { Post, State } from "@prisma/client";
import { Dot, Filter, MapPin, Search } from "lucide-react";
import React from "react";
import Link from "next/link";
import AsideBar from "@/components/aside-bar";
import HomePagination from "@/components/home-pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  "ALL",
  "JOB",
  "ADMIT_CARD",
  "RESULT",
  "IMPORTANT",
  "ANSWER_KEY",
] as const;

const getNotifications = async () => {
  return await db.notification.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
};
const postsFunction = async (
  page: number,
  state: string,
  category: (typeof CATEGORIES)[number]
) => {
  const where: any = {};

  if (state !== "all") {
    where["state"] = {
      name: state,
    };
  }
  if (category !== "ALL") {
    where["category"] = category;
  }
  return db.$transaction(async (db) => {
    const [posts, total] = await Promise.all([
      db.post.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          state: true,
        },
        where,
        take: page * 10,
        skip: (page - 1) * 10,
      }),
      db.post.count(),
    ]);
    return {
      total: total,
      posts: posts,
    };
  });
};
const getStates = async () => {
  const states = await db.state.findMany();
  return states;
};
interface IPost extends Post {
  state: State;
}

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    state: "string";
    category: (typeof CATEGORIES)[number];
  };
}) => {
  const page = searchParams.page ? searchParams.page : 1;
  const currentState = searchParams.state || "all";
  const currentCategory = searchParams.category || "ALL";
  const dbResponse = await postsFunction(page, currentState, currentCategory);
  const posts: IPost[] = dbResponse.posts;
  const states = await getStates();
  const notifications = await getNotifications();
  const Card = ({ post }: { post: IPost }) => (
    <Link
      href={`/${post.id}`}
      className="border rounded p-3 flex gap-2 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:scale-[101%] duration-300 "
    >
      <div>
        <div
          className="w-8 h-8 bg-slate-300 rounded-full flex
        items-center justify-center"
        >
          <span className="text-lg font-bold capitalize">
            {post.title.trim()[0]}
          </span>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold">{post.title}</h3>{" "}
        <div className="flex justify-between items-center flex-wrap ">
          <p className="text-xs text-muted-foreground italic">
            By {post.company}
          </p>
          <span className=" border rounded-full py-1 px-2 text-muted-foreground text-xs">
            {post.category}
          </span>
        </div>
        <ul className="flex md:gap-2 flex-wrap text-sm text-muted-foreground mt-6">
          <li className="flex items-center capitalize">
            <Dot className="inline " size={20} />{" "}
            {post.state.name === "all" ? "All India" : post.state.name}
          </li>
          {post.tags.split(",").map((tag) => (
            <li className="flex items-center" key={tag}>
              <Dot className="inline" size={20} /> {tag}
            </li>
          ))}
        </ul>
        <p className=" text-xs text-muted-foreground mt-7 pl-3">
          {post.updatedAt.toLocaleDateString()}{" "}
        </p>
      </div>
    </Link>
  );

  return (
    <div className="container md:mt-12 mt-6">
      <div className="grid md:grid-cols-6 gap-6">
        <div className="md:col-span-4">
          <div className="grid">
            <div className="flex pb-2 md:pb-0 overflow-auto gap-2 md:flex-wrap  items-center">
              <span className="text-muted-foreground px-2">
                <Filter size={16} />
              </span>
              {CATEGORIES.map((category, index) => (
                <Link
                  href={`/?state=${currentState}&page=${1}&category=${category}`}
                  className={`text-sm border text-ellipsis whitespace-nowrap rounded-full px-4 py-1 ${
                    currentCategory === category
                      ? " border-primary text-primary bg-primary/10 "
                      : " text-muted-foreground hover:border-primary "
                  } capitalize`}
                  key={index}
                >
                  {category.toLocaleLowerCase().split("_").join(" ")}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid">
            <div className="flex pb-2 md:pb-0 overflow-auto gap-2 md:flex-wrap  items-center my-2">
              <span className="text-muted-foreground px-2">
                <MapPin size={16} />
              </span>
              {states.map((state, index) => (
                <Link
                  href={`/?state=${
                    state.name
                  }&page=${1}&category=${currentCategory}`}
                  className={`text-sm border rounded-full px-4 py-1 ${
                    state.name === currentState
                      ? " border-primary text-primary bg-primary/10 "
                      : " text-muted-foreground hover:border-primary "
                  } capitalize`}
                  key={index}
                >
                  {state.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            {posts.map((post: IPost) => (
              <Card key={post.id} post={post} />
            ))}
          </div>
          <div className="mt-6">
            <HomePagination total={dbResponse.total} currentPage={page} />
          </div>
        </div>
        <AsideBar notifications={notifications} />
      </div>
    </div>
  );
};

export default page;

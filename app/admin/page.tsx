import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const adminLinks: { name: string; link: string }[] = [
    {
      name: "Posts",
      link: "admin/posts",
    },
    {
      name: "Notifications",
      link: "admin/notifications",
    },
    { name: "States", link: "admin/states" },
  ];
  const session = await auth();
  if (!session?.user) {
    redirect("api/auth/signin");
  }
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }
  return (
    <div>
      <div className="container md:mt-12 mt-6">
        <h1 className="text-lg font-bold ">Admin Controls </h1>
        <p className="text-sm text-muted-foreground ">
          Welcome {session.user.name} as {session.user.role}
        </p>
        <div className="grid gap-6 md:grid-cols-4">
          {adminLinks.map((link, index) => (
            <Link
              href={link.link}
              className="border rounded px-2 text-muted-foreground hover:text-foreground duration-300 hover:bg-slate-100 py-4"
              key={index}
            >
              <h2 className="">{link.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;

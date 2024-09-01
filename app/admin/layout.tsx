import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const links: { name: string; link: string }[] = [
    {
      name: "Admin Home",
      link: "/admin",
    },
    {
      name: "Posts",
      link: "/admin/posts",
    },
    {
      name: "Noitfications",
      link: "/admin/notifications",
    },
  ];

  return (
    <div>
      <div className="flex justify-center py-3 gap-5 bg-primary text-white ">
        {links.map((link, index) => (
          <nav key={index}>
            <Link href={link.link}>{link.name}</Link>
          </nav>
        ))}
      </div>

      {children}
    </div>
  );
};

export default layout;

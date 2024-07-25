import Link from "next/link";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
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

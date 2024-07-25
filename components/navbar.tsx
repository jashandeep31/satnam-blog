"use client";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const desktopLinks: {
    name: string;
    link: string;
  }[] = [
    {
      name: "Home",
      link: "/",
    },

    {
      name: "Whatsapp group",
      link: "/about-us",
    },

    {
      name: "Telegram group",
      link: "/about-us",
    },
    {
      name: "About Us",
      link: "/about-us",
    },
    {
      name: "Contact Us",
      link: "/contact-us",
    },
  ];
  return (
    <div className="container flex justify-between flex-col items-center bg-primary text-white  py-3">
      <h1 className="text-xl my-6 font-bold"> Rojgarseeker</h1>
      <div className="flex  gap-6">
        {desktopLinks.map((item, index) => (
          <nav key={index}>
            <Link className="text-sm text-muted " href={item.link}>
              {item.name}
            </Link>
          </nav>
        ))}
      </div>
    </div>
  );
};

export default Navbar;

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

  const mobileLinks: {
    name: string;
    link: string;
  }[] = [
    {
      name: "Home",
      link: "/",
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
    <div className="container flex p-0 justify-between flex-col items-center bg-primary text-white  ">
      <h1 className="md:text-3xl text-xl my-6 md:my-12 font-bold">
        {" "}
        Rojgarseeker
      </h1>
      <div className="md:flex hidden  gap-6 bg-foreground  py-2 w-full justify-center nav-links">
        {desktopLinks.map((item, index) => (
          <nav key={index}>
            <Link
              className="   text-yellow-400 font-bold hover:text-yellow-500 duration-300"
              href={item.link}
            >
              {item.name}
            </Link>
          </nav>
        ))}
      </div>
      <div className="md:hidden flex  gap-6 bg-foreground  py-2 w-full justify-center">
        {mobileLinks.map((item, index) => (
          <nav key={index}>
            <Link
              className="   text-yellow-400 font-bold hover:text-yellow-500 duration-300"
              href={item.link}
            >
              {item.name}
            </Link>
          </nav>
        ))}
      </div>
    </div>
  );
};

export default Navbar;

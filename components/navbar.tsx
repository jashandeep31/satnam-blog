"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container flex p-0 justify-between flex-col items-center bg-primary text-white  ">
      {/* <h1 className="md:text-3xl text-xl my-6 md:my-12 font-bold">
        Rojgarseeker
      </h1> */}
      <Link href={"/"}>
        <Image
          src={"/logo.png"}
          className="h-20 w-auto   my-6 md:my-6"
          width={390}
          height={136}
          alt="rojgarseeker"
        />
      </Link>
      <div
        className={`md:flex hidden  gap-6 bg-foreground  py-2 w-full justify-center nav-links ${
          isScrolled ? "container fixed top-0 z-10" : ""
        } `}
      >
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
      <div
        className={`md:hidden flex  gap-6 bg-foreground  py-2 w-full justify-center ${
          isScrolled ? "container fixed top-0 z-10" : ""
        } `}
      >
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

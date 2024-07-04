"use client";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="container flex justify-between flex-col items-center bg-primary text-white  py-3">
      <h1 className="text-xl my-6 font-bold"> Rojgarseeker</h1>
      <div className="flex  gap-6">
        <nav>
          <Link className="text-sm text-muted " href="/">
            Home
          </Link>
        </nav>
        <nav>
          <Link className="text-sm text-muted " href="/">
            Categories
          </Link>
        </nav>
        <nav>
          <Link className="text-sm text-muted " href="/">
            Contact Us
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

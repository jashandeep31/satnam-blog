import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { SignIn } from "@/components/sign-in";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen justify-between flex-col">
      <header>
        <Navbar />
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;

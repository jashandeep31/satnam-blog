import Navbar from "@/components/navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen justify-between flex-col">
      <header>
        <Navbar />
      </header>
      <main className="flex-1">{children}</main>
      <footer>
        <p>footer</p>
      </footer>
    </div>
  );
};

export default layout;

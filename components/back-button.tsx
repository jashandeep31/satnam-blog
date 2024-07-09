"use client";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="inline-flex  mb-2 items-center text-muted-foreground hover:text-foreground text-sm gap-1"
    >
      <MoveLeft size={12} className="inline" /> Back
    </button>
  );
};

export default BackButton;

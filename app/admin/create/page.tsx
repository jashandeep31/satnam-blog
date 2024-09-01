"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const DynamicCreatePostComponent = dynamic(() => import("./CreateComponent"), {
  ssr: false,
});

const Page = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <DynamicCreatePostComponent /> : null;
};

export default Page;

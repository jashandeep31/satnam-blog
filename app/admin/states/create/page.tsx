"use client";
import { createState } from "@/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/db";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [StateValue, setStateValue] = useState<string>("");
  const [formState, setFormState] = useState<
    null | "loading" | "error" | "success"
  >(null);

  const submitForm = async () => {
    setFormState("loading");
    const result = await createState(StateValue);
    setFormState(result);
  };

  return (
    <div className="container md:mt-12 mt-6">
      <Link className={buttonVariants({ variant: "link" })} href={"/admin"}>
        Home
      </Link>
      <h1 className="text-lg font-bold">Create State</h1>
      <p className="text-sm text-muted-foreground ">create a new State here</p>
      <div className="mt-4">
        <div>
          <Label>State Name</Label>
          <Input
            value={StateValue}
            onChange={(e) => {
              setStateValue(e.target.value);
            }}
          />
        </div>
        <div className="mt-3">
          <Button disabled={formState !== null} onClick={() => submitForm()}>
            Create State
          </Button>
        </div>

        {formState === "error" && (
          <p className="text-sm text-red-500 font-bold">Something went wrong</p>
        )}
        {formState === "success" && (
          <p className="text-sm text-green-500 font-bold">State got created</p>
        )}
      </div>
    </div>
  );
};

export default Page;

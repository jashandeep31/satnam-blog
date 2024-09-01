import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="container md:mt-12 mt-6">
      <h1 className="text-xl md:text-2xl font-bold">Contact US</h1>
      <p className="text-muted-foreground">
        Get in touch with us. If you have any query or suggestion then send an
        email or fill hte form given below.
      </p>

      <div>
        <p className="flex gap-2">
          Email-
          <Link
            className="text-primary underline"
            href={"mailto:contact@rojgarseeker.com"}
          >
            contact@rojgarseeker.com
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;

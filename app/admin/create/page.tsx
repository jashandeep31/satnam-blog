"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Page = () => {
  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    console.log(`1fjasdklfjkldsjfl;`);
  };
  const [value, setValue] = useState("");
  console.log(value);
  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        // image: handleImageUpload,
      },
    },
  };
  return (
    <div className="container md:mt-12 mt-6">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        // modules={modules}
      />
    </div>
  );
};

export default Page;

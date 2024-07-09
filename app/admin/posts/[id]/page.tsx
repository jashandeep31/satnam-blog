import PostCreateEdit from "@/components/post-create-edit";
import { db } from "@/lib/db";
import React from "react";

const getPost = async (id: string) => {
  return await db.post.findUnique({
    where: {
      id,
    },
    include: {
      blogBody: true,
    },
  });
};

const page = async ({ params }: { params: { id: string } }) => {
  const post = await getPost(params.id);
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container md:mt-12 mt-6">
      <div>
        <h1 className="text-xl"> Edit post</h1>
        <PostCreateEdit post={post} />
      </div>
    </div>
  );
};

export default page;

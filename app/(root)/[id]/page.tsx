import AsideBar from "@/components/aside-bar";
import BackButton from "@/components/back-button";
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

const getNotifications = async () => {
  return db.notification.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
const page = async ({ params }: { params: { id: string } }) => {
  const notifications = await getNotifications();
  const post = await getPost(params.id);
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container md:mt-12 mt-6">
      <div className="grid md:grid-cols-6  gap-6">
        <div className="md:col-span-4">
          <div>
            <BackButton />
            <h1 className="text-4xl font-bold">{post?.title}</h1>
            <h3 className="text-base text-muted-foreground ">
              {post.description}
            </h3>
          </div>

          <div
            className="mt-12 max-w-screen overflow-auto post-body"
            dangerouslySetInnerHTML={{ __html: post?.blogBody?.body ?? "" }}
          ></div>
        </div>
        <AsideBar notifications={notifications} />
      </div>
    </div>
  );
};

export default page;

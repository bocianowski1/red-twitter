import { Post } from "@prisma/client";
import React from "react";
import ProfileImage from "../utils/profile-image";

const Stories = ({ posts }: { posts?: Post[] }) => {
  return (
    <>
      <div className="fixed top-16 z-20 flex h-16 w-full items-center overflow-scroll border-b border-black/20 bg-gray-50">
        {posts && posts.length > 0 && (
          <ul className="flex gap-8 px-4">
            {posts &&
              posts.length > 0 &&
              posts.map((post: Post) => (
                <li key={post.id}>
                  <ProfileImage
                    size={2.25}
                    image={post.image ?? ""}
                    hasRing={true}
                  />
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  );
};

const Story = () => {
  return <div>Story</div>;
};

export default Stories;

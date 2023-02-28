import { Post, User } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import BottomTabs from "~/components/layout/bottom-tabs";
import Header from "~/components/layout/header";
import { api } from "~/utils/api";

const Search = () => {
  const { data } = useSession();

  const posts = api.posts.getAll.useQuery().data;
  const users = api.users.getAll.useQuery().data;
  return (
    <>
      <Header showStories={false} />

      <div className="flex h-screen flex-col items-center justify-center gap-8 py-16 text-gray-800">
        <h1>Search</h1>
        <h2>Users</h2>
        {users &&
          users.map((user: User) => <div key={user.id}>{user.name}</div>)}
        <hr />
        {posts &&
          posts.map((post: Post) => (
            <div key={post.id}>
              <p>{post.caption}</p>
            </div>
          ))}
      </div>
      {data && <BottomTabs />}
    </>
  );
};

export default Search;

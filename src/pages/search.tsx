import { type Post, type User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import BottomTabs from "~/components/layout/bottom-tabs";
import Header from "~/components/layout/header";
import { api } from "~/utils/api";

const Search = () => {
  const { data } = useSession();

  const posts = api.posts.getAll.useQuery().data;
  const users = api.users.getAll.useQuery().data;

  const [postSearchTerm, setPostSearchTerm] = useState("");
  const [userSearchTerm, setUserSearchTerm] = useState("");

  const searchPosts = api.posts.getPostByContent.useQuery({
    searchTerm: postSearchTerm,
  }).data;
  const searchUsers = api.users.getUserByName.useQuery({
    searchTerm: userSearchTerm,
  }).data;

  return (
    <>
      <Header showStories={false} />

      <main className="flex h-screen flex-col items-center justify-start gap-8 py-2 text-gray-800">
        <h1>Look up users and posts</h1>
        <section className="grid grid-cols-2">
          <div>
            <h2>Posts</h2>
            <input
              className="border border-black/50"
              value={postSearchTerm}
              onChange={(e) => {
                setPostSearchTerm(e.target.value);
              }}
            />
            <div>
              {searchPosts &&
                searchPosts.map((post: Post) => (
                  <div key={post.id}>
                    <Link href={`/${post.id}`}>
                      <p>{post.caption}</p>
                    </Link>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h2>Users</h2>
            <input
              className="border border-black/50"
              value={userSearchTerm}
              onChange={(e) => {
                setUserSearchTerm(e.target.value);
              }}
            />
            <div>
              {searchUsers &&
                searchUsers.map((user: User) => (
                  <div key={user.id}>{user.name}</div>
                ))}
            </div>
          </div>
        </section>
      </main>
      {data && <BottomTabs activeSection="search" />}
    </>
  );
};

export default Search;

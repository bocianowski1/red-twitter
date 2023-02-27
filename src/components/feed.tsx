import { Post } from "@prisma/client";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { api } from "~/utils/api";
import CreatePost from "./create-post";
import Loading from "./loading";
import PostCard from "./post-card";
import Stories from "./stories";

const Feed = () => {
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const { data: posts, refetch: refetchPosts } = api.posts.getAll.useQuery();

  const scrollToTop = () => {};

  return (
    <>
      <Stories posts={posts} />

      <button
        className="fixed bottom-40 right-4 rounded-full border 
                    border-black/50 bg-rose-500 p-4 text-xl font-semibold no-underline shadow-lg 
                    transition hover:bg-rose-500/80"
        onClick={() => {
          setShowCreatePostForm(!showCreatePostForm);
          if (showCreatePostForm)
            document.getElementById("feed")?.scrollIntoView();
        }}
      >
        {showCreatePostForm ? (
          <motion.div
            initial={{ rotateZ: 0 }}
            animate={{ rotateZ: 135 }}
            transition={{ duration: 0.5 }}
          >
            <FaPlus />
          </motion.div>
        ) : (
          <motion.div
            initial={{ rotateZ: 135 }}
            animate={{ rotateZ: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaPlus />
          </motion.div>
        )}
      </button>
      <div className="h-screen overflow-scroll pb-16 pt-32">
        {showCreatePostForm && (
          <CreatePost
            setShowCreatePostForm={setShowCreatePostForm}
            refetchPosts={refetchPosts}
          />
        )}
        {posts ? (
          posts?.length > 0 ? (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post: Post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  refetchPosts={refetchPosts}
                />
              ))}
            </section>
          ) : (
            <div>
              <p className="text-lg font-thin text-white">No posts {":("}</p>
            </div>
          )
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default Feed;

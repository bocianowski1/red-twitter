import { Post } from "@prisma/client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { api } from "~/utils/api";
import CreatePost from "./create-post";
import Loading from "../utils/loading";
import PostCard from "./post-card";
import Header from "../layout/header";
// import { useSiteContext } from "~/context/site-context";

const Feed = () => {
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const { data: posts, refetch: refetchPosts } = api.posts.getAll.useQuery();
  // const { setActiveSection } = useSiteContext();

  // useEffect(() => {
  //   setActiveSection("feed");
  // }, []);

  return (
    <>
      <Header showStories posts={posts} />
      <button
        className="fixed bottom-40 right-4 rounded-full border 
                    border-black/50 bg-rose-500 p-4 text-xl font-semibold no-underline shadow-lg 
                    transition hover:bg-rose-500/80"
        onClick={() => {
          setShowCreatePostForm(!showCreatePostForm);
          // if (showCreatePostForm) window.scrollTo(0, 0);
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
      <div className="h-screen overflow-scroll py-16">
        {showCreatePostForm && (
          <CreatePost
            setShowCreatePostForm={setShowCreatePostForm}
            refetchPosts={refetchPosts}
          />
        )}
        {posts ? (
          posts?.length > 0 ? (
            <section className="flex flex-col">
              {posts.map((post: Post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  refetchPosts={refetchPosts}
                />
              ))}
            </section>
          ) : (
            <div className="mt-52 flex justify-center">
              {!showCreatePostForm && (
                <p className="text-lg font-thin">No posts {":("}</p>
              )}
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

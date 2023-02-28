import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaPlus, FaPaperPlane } from "react-icons/fa";
import { api } from "../../utils/api";
import ProfileImage from "../utils/profile-image";

const CreatePost = ({
  refetchPosts,
  setShowCreatePostForm,
}: {
  refetchPosts: () => void;
  setShowCreatePostForm: (show: boolean) => void;
}) => {
  const createPost = api.posts.createPost.useMutation({
    onSuccess: () => {
      void refetchPosts();
    },
  });

  const { data } = useSession();
  const user = data?.user;

  const [title, setTitle] = useState<string>("");
  const [caption, setCaption] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (caption.length > 0) {
      createPost.mutate({
        title,
        caption,
      });
      setTitle("");
      setCaption("");
      setShowCreatePostForm(false);
    }
  };

  return (
    <div className="relative">
      <button
        className="absolute top-0 right-0 m-2 rounded-full border
                    border-black/50 bg-gray-200 p-2 text-sm font-semibold shadow-lg 
                    transition hover:bg-gray-300/80"
        onClick={() => setShowCreatePostForm(false)}
      >
        <FaPlus className="rotate-45 " />
      </button>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex min-h-[10rem] w-full gap-4 overflow-scroll border-y-[0.5px] border-black/20
                  bg-gray-200 px-4 py-2 text-gray-800"
      >
        <div className="mt-1 w-12">
          <ProfileImage size={3} image={user?.image ?? ""} hasRing={true} />
        </div>
        <div className="mr-8 flex w-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex w-full flex-col">
              <h2 className="font-bold">{user?.name}</h2>
              <h4 className="text-xs font-thin text-gray-500">{user?.email}</h4>

              <div className="flex w-full items-center gap-4 py-4">
                <textarea
                  required
                  autoFocus
                  // placeholder="What's on your mind?"
                  value={caption}
                  maxLength={140}
                  onChange={(e) => setCaption(e.target.value)}
                  className="flex w-64 resize-none overflow-scroll rounded-md 
                border border-black/20 px-2 py-1 text-sm ring-0"
                />
                <button type="submit">
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;

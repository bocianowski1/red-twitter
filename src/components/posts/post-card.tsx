import { Post, Comment } from "@prisma/client";
import React, { useState } from "react";
import { api } from "../../utils/api";
import { useSession } from "next-auth/react";
import {
  FaPen,
  FaTrash,
  FaHeart,
  FaComment,
  FaPeopleArrows,
} from "react-icons/fa";
import ProfileImage from "../utils/profile-image";
import Link from "next/link";

interface Props {
  post: Post;
  refetchPosts: () => void;
}

const PostCard = ({ post, refetchPosts }: Props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const incrementLikes = api.posts.incrementLikeCount.useMutation();
  const deletePost = api.posts.deletePost.useMutation({
    onSuccess: () => {
      void refetchPosts();
    },
  });

  const { id, caption, likes, createdAt } = post;
  const [numberOfLikes, setNumberOfLikes] = useState(likes);

  const { data: comments } = api.comments.getAll.useQuery({
    postId: id,
  });

  const deleteCommentsOnPost =
    api.comments.deleteAllCommentsOnPost.useMutation();

  const { data } = useSession();
  const { email, name, image } = data!.user;

  return (
    <>
      <div
        className="flex min-h-[10rem] w-full gap-4 overflow-scroll border-y-[0.5px] border-black/20
                  px-4 py-2 text-gray-800
                  transition-all hover:bg-black/10"
      >
        <div className="mt-1 w-12">
          <ProfileImage size={3} image={image ?? ""} hasRing={true} />
        </div>
        <div className="mr-8 flex w-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex w-full flex-col">
              <h2 className="font-bold">{name}</h2>
              <h4 className="text-xs font-thin text-gray-500">{email}</h4>
              <Link href={`/${id}`} className="h-20 overflow-scroll">
                <h3 className="py-1 text-sm">{caption}</h3>
              </Link>
            </div>
            <span className="flex justify-end py-2 text-xs font-thin">
              {createdAt.toUTCString()}
            </span>
          </div>

          <div className="mr-2 flex justify-between py-2 text-black/60">
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2"
            >
              <FaComment />
              <span className="text-sm font-thin">{comments?.length}</span>
            </button>
            <button
              className="flex items-center gap-2"
              onClick={() => {
                setIsLiked(!isLiked);
                setNumberOfLikes(
                  isLiked ? numberOfLikes - 1 : numberOfLikes + 1
                );
                incrementLikes.mutate({ id, likes: numberOfLikes });
              }}
            >
              <FaHeart className={`${isLiked && "text-rose-400"}`} />
              <span className="text-sm font-thin">{numberOfLikes}</span>
            </button>
            <button>
              <FaPeopleArrows />
            </button>
            <button
              onClick={() => {
                const confirmDelete = confirm(
                  `Are you sure you want to delete this?`
                );
                if (confirmDelete) {
                  deleteCommentsOnPost.mutate({
                    postId: id,
                  });
                  deletePost.mutate({
                    id,
                  });
                }
              }}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;

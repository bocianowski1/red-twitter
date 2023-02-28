import { type Comment } from "@prisma/client";
import { useState } from "react";
import { api } from "~/utils/api";
import { FaHeart } from "react-icons/fa";

const CommentCard = ({ comment }: { comment: Comment }) => {
  const { id, message, likes, createdAt, userId } = comment;
  const incrementLikes = api.comments.incrementLikeCount.useMutation();
  const getUser = api.users.getUser.useQuery({
    userId,
  });
  const user = getUser.data;

  const [isLiked, setIsLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(likes);

  return (
    <div className="bg-black/5 px-4 py-2 hover:bg-black/10">
      <div className="flex items-center gap-4">
        <div className="h-6 w-6">
          <img
            className="h-full w-full rounded-full object-cover"
            src={user?.image ?? ""}
            alt="profile image"
          />
        </div>
        <div>
          <h2 className="font-bold">{user?.name}</h2>
          <h3 className="text-xs font-thin">{user?.email}</h3>
        </div>
      </div>
      <div className="">
        <h4 className="py-4 font-thin">{message}</h4>
        <button
          onClick={() => {
            setIsLiked(!isLiked);
            setNumberOfLikes(isLiked ? numberOfLikes - 1 : numberOfLikes + 1);
            incrementLikes.mutate({ id, likes: numberOfLikes });
          }}
          className="flex items-center gap-2 rounded-full p-2 hover:bg-black/10"
        >
          <FaHeart className={`${isLiked ? "text-rose-400" : ""}`} />
          <span className="text-sm font-thin">{numberOfLikes}</span>
        </button>
        <span className="text-xs font-thin">{createdAt.toUTCString()}</span>
      </div>
    </div>
  );
};

export default CommentCard;

import { type Comment } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaComment, FaPaperPlane, FaPen, FaTrash } from "react-icons/fa";
import BottomTabs from "~/components/layout/bottom-tabs";
import CommentCard from "~/components/comments/comment";
import Header from "~/components/layout/header";
import Loading from "~/components/utils/loading";
import ProfileImage from "~/components/utils/profile-image";
import { api } from "~/utils/api";
import { ParsedUrlQuery } from "querystring";
import { useSession } from "next-auth/react";

export const getServerSideProps = ({ params }: { params: ParsedUrlQuery }) => {
  const { id } = params;

  return {
    props: {
      id,
    },
  };
};

const PostDetails = ({ id }: { id: string }) => {
  const post = api.posts.getPostById.useQuery({
    id,
  }).data;

  const user = api.users.getUser.useQuery({
    userId: post?.userId ?? "",
  }).data;

  const { data } = useSession();
  const activeUser = data?.user;

  const { data: allCommentsOnPost, refetch: refetchComments } =
    api.comments.getAll.useQuery({
      postId: post?.id ?? "",
    });

  const addComment = api.comments.comment.useMutation({
    onSuccess: () => {
      void refetchComments();
    },
  });

  const deleteAllCommentsOnPost =
    api.comments.deleteAllCommentsOnPost.useMutation({
      onSuccess: () => {
        void refetchComments();
      },
    });

  const deletePost = api.posts.deletePost.useMutation({
    onSuccess: () => {
      void router.push("/");
    },
  });

  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(true);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addComment.mutate({
      postId: post?.id ?? "",
      message: comment,
    });
    setComment("");
  };

  return (
    <>
      <Header showStories={false} />
      {post ? (
        <main className="flex min-h-screen w-screen flex-col items-center overflow-hidden">
          <section className="mt-16 w-screen p-4">
            <div className="flex gap-4">
              <ProfileImage size={3} image={user?.image ?? ""} hasRing />
              <div>
                <h1 className="text-xl font-bold">{user && user.name}</h1>
                <h3 className="text-sm font-thin">{user && user.email}</h3>
              </div>
            </div>
            <div>
              <p className="mt-4 pb-4">{post.caption}</p>
              <div>
                <span className="text-xs font-thin">
                  {post.createdAt.toUTCString()}
                </span>
              </div>
            </div>
            <div className="mt-2 flex items-center border-y-[0.5px] border-black/20 px-2 py-1">
              <div className="flex-1">
                <button
                  onClick={() => {
                    setShowCommentForm(!showCommentForm);
                  }}
                  className="flex items-center gap-2 font-thin"
                >
                  <FaComment />
                  <span className="text-sm">{allCommentsOnPost?.length}</span>
                </button>
              </div>
              <button
                onClick={() => setEdit(!edit)}
                className="rounded-full p-2 hover:bg-black/10"
              >
                <FaPen />
              </button>
              <button
                onClick={() => {
                  if (
                    post.userId === activeUser?.id ||
                    activeUser?.name === "torger"
                  ) {
                    const confirmDelete = confirm(
                      `Are you sure you want to delete this?`
                    );
                    if (confirmDelete) {
                      deleteAllCommentsOnPost.mutate({
                        postId: id,
                      });
                      deletePost.mutate({
                        id,
                      });
                    }
                  } else {
                    alert(
                      "You are not the owner of this post and cannot delete it"
                    );
                  }
                }}
              >
                <FaTrash />
              </button>
            </div>
            {showCommentForm && (
              <div className="flex flex-col items-start">
                <form
                  onSubmit={(e) => handleSubmit(e)}
                  className="flex items-center gap-4 py-4"
                >
                  <ProfileImage
                    size={2.25}
                    image={activeUser?.image ?? ""}
                    hasRing={false}
                  />
                  <textarea
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSubmit(e);
                    }}
                    required
                    value={comment}
                    maxLength={70}
                    onChange={(e) => setComment(e.target.value)}
                    className="flex w-64 resize-none overflow-scroll rounded-md 
                            border border-black/20 px-2 py-1 text-sm ring-0"
                  />
                  <button type="submit">
                    <FaPaperPlane />
                  </button>
                </form>
                {allCommentsOnPost && allCommentsOnPost.length > 0 && (
                  <button
                    onClick={() => {
                      if (
                        post.userId === activeUser?.id ||
                        activeUser?.name === "torger"
                      ) {
                        deleteAllCommentsOnPost.mutate({
                          postId: post.id,
                        });
                      } else {
                        alert(
                          "You are not the owner of this post and cannot delete it"
                        );
                      }
                    }}
                    className="mb-4 rounded-xl border-[0.5px] border-rose-600 bg-black/5 px-4 py-2 font-thin
                            transition-all hover:bg-rose-600 hover:text-white"
                  >
                    Delete all comments
                  </button>
                )}
              </div>
            )}
            {allCommentsOnPost && allCommentsOnPost.length > 0 && (
              <div className="mt-4 mb-12 flex h-fit flex-col gap-2">
                {allCommentsOnPost.map((comment: Comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </div>
            )}
          </section>
        </main>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center">
          <Loading />
        </div>
      )}
      <BottomTabs activeSection="feed" />
    </>
  );
};

export default PostDetails;

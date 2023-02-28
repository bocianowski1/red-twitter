import { Comment, Post } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaComment, FaPen, FaTrash } from "react-icons/fa";
import BottomTabs from "~/components/layout/bottom-tabs";
import CommentCard from "~/components/comments/comment";
import CommentForm from "~/components/comments/comment-form";
import EditPostForm from "~/components/posts/edit-post";
import Header from "~/components/layout/header";
import Loading from "~/components/utils/loading";
import ProfileImage from "~/components/utils/profile-image";
import { api } from "~/utils/api";

export const getServerSideProps = async (context: any) => {
  const id = context.params.id;

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

  const { data: allCommentsOnPost, refetch: refetchComments } =
    api.comments.getAll.useQuery({
      postId: post?.id ?? "",
    });

  const addComment = api.comments.comment.useMutation({
    onSuccess: () => {
      void refetchComments();
    },
  });

  const deletePost = api.posts.deletePost.useMutation({
    onSuccess: () => {
      router.push("/");
    },
  });

  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comment, setComment] = useState("");

  // const { id: postId, title, caption, likes, createdAt } = post;
  return (
    <>
      <Header showStories={false} />
      {post ? (
        <main className="flex h-screen w-screen flex-col items-center bg-red-200">
          <section className="mt-16 w-screen bg-yellow-200 px-4">
            <div className="flex bg-green-200">
              <ProfileImage size={3} image={post.image ?? ""} hasRing={false} />
              <div>
                <h1>{user && user.name}</h1>
                <h3>{user && user.email}</h3>
              </div>
            </div>
            <div>
              <p className="bg-blue-200">{post.caption}</p>
              <div>
                <span>{post.createdAt.toUTCString()}</span>
              </div>
            </div>
            <div className="flex px-2">
              <button
                onClick={() => {
                  setShowCommentForm(!showCommentForm);
                }}
                className="flex-1"
              >
                <FaComment />
              </button>
              <button
                onClick={() => setEdit(!edit)}
                className="rounded-full p-2 hover:bg-black/10"
              >
                <FaPen />
              </button>
              <button
                onClick={() => {
                  const confirmDelete = confirm();
                  `Are you sure you want to delete this?`;
                  if (confirmDelete) {
                    // deleteCommentsOnPost.mutate({
                    //   postId: id,
                    // });
                    deletePost.mutate({
                      id,
                    });
                  }
                }}
                className="rounded-full p-2 hover:bg-black/10"
              >
                <FaTrash />
              </button>
            </div>
            {showCommentForm && <CommentForm />}
            {allCommentsOnPost && allCommentsOnPost.length > 0 && (
              <div>
                {allCommentsOnPost.map((comment: Comment) => (
                  <CommentCard comment={comment} />
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
      <BottomTabs />
      {/* <div>
        <div className="flex-1">
          <button
            onClick={() => setEdit(!edit)}
            className="rounded-full p-2 hover:bg-black/10"
          >
            <FaPen />
          </button>
          <button
            onClick={() => {
              const confirmDelete = confirm();
              `Are you sure you want to delete this?`
              if (confirmDelete) {
                // deleteCommentsOnPost.mutate({
                //   postId: id,
                // });
                deletePost.mutate({
                  id,
                });
              }
            }}
            className="rounded-full p-2 hover:bg-black/10"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <div>
        {edit && (
          <div className="relative">
            <button
              className="absolute top-0 right-0 p-4"
              onClick={() => setEdit(false)}
            >
              X
            </button>
            <EditPostForm refetchPosts={refetchPosts} post={post} /> 
          </div>
        )}
      </div> */}
    </>
  );
};

export default PostDetails;

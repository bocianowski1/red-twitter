import { Post } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import EditPostForm from "~/components/edit-post";
import { api } from "~/utils/api";

// export const getServerSideProps = async ({ params }: any) => {
//   const id = params.id;
//   const post = api.posts.getPostById.useQuery({
//     id,
//   });

//   return {
//     props: {
//       post,
//     },
//   };
// };

const Post = ({ post }: { post: Post }) => {
  const [edit, setEdit] = useState(false);
  // const post = api.posts.getPostById.useQuery({
  //   id,
  // });

  const deletePost = api.posts.deletePost.useMutation({
    onSuccess: () => {
      // void refetchPosts();
    },
  });
  useEffect(() => {
    console.log("hei");
  });

  //   const { id, title, caption, likes, createdAt } = post;
  return (
    <div>
      hei
      {/* <div></div>
      <div>
        <div className="flex-1">
          <button
            onClick={() => setEdit(!edit)}
            className="rounded-full p-2 hover:bg-black/10"
          >
            <FaPen />
          </button>
          <button
            onClick={() => {
              const confirmDelete = confirm(
                `Are you sure you want to delete ${title}`
              );
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
            {/* <EditPostForm refetchPosts={refetchPosts} post={post} /> 
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Post;

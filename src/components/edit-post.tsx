import { Post } from "@prisma/client";
import React, { useState } from "react";
import { api } from "../utils/api";

const EditPostForm = ({
  refetchPosts,
  post,
}: {
  refetchPosts: () => void;
  post: Post;
}) => {
  const { id, title, caption } = post;
  const updatePost = api.posts.updatePost.useMutation({
    onSuccess: () => {
      void refetchPosts();
    },
  });
  const [newTitle, setNewTitle] = useState("");
  const [newCaption, setNewCaption] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        updatePost.mutate({
          id,
          title: newTitle.length > 0 ? newTitle : title,
          caption: newCaption.length > 0 ? newCaption : caption,
        });
        setNewTitle("");
        setNewCaption("");
      }}
    >
      <input
        placeholder="title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <input
        placeholder="caption"
        value={newCaption}
        onChange={(e) => setNewCaption(e.target.value)}
      />
      <button type="submit">Submit changes</button>
    </form>
  );
};

export default EditPostForm;

import React from "react";
import PostsLayout from "../PostsGrid/PostsLayout";
import Post from "../Post/Post";
import { useSelector } from "react-redux";

const UserSavedPosts = () => {
  const { savedPosts } = useSelector((state) => {
    return state.User;
  });
  return (
    <div className="user-created-posts">
      <PostsLayout>
        {savedPosts &&
          savedPosts.map((post, i) => {
            return <Post data={post} key={i} />;
          })}
      </PostsLayout>
    </div>
  );
};

export default UserSavedPosts;

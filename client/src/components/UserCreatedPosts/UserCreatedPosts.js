import React from "react";
import PostsLayout from "../PostsGrid/PostsLayout";
import Post from "../Post/Post";
import { useSelector } from "react-redux";

const UserCreatedPosts = () => {
  const { username, posts, userPic } = useSelector((state) => {
    return state.User;
  });
  return (
    <div className="user-created-posts">
      <PostsLayout>
        {posts &&
          posts.map((post, i) => {
            return (
              <Post
                data={post}
                key={i}
                userInfo={{ username, userPic }}
                type={"user-post"}
              />
            );
          })}
      </PostsLayout>
    </div>
  );
};

export default UserCreatedPosts;

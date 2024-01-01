import React from 'react'
import PostsLayout from '../PostsGrid/PostsLayout';
import Post from '../Post/Post';

const UserSavedPosts = ({ savedPosts, userInfo }) => {
  return (
    <div className="user-created-posts">
      <PostsLayout>
        {savedPosts &&
          savedPosts.map((post, i) => {
            return <Post data={post} key={i} userInfo={userInfo} />;
          })}
      </PostsLayout>
    </div>
  );
};

export default UserSavedPosts

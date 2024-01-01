import React from 'react'
import PostsLayout from '../PostsGrid/PostsLayout';
import Post from '../Post/Post';


const UserCreatedPosts = ({ createdPosts, userInfo }) => {
  return (
    <div className="user-created-posts">
      <PostsLayout>
        {createdPosts &&
          createdPosts.map((post, i) => {
            return <Post data={post} key={i} userInfo={userInfo} type={'user-post'} />;
          })}
      </PostsLayout>
    </div>
  );
};

export default UserCreatedPosts

import React from 'react'

const PostsLayout = ({children}) => {
  return (
    <div className="xl:columns-5 lg:columns-4 md:columns-3 sm:columns-2 sm:mx-auto xl:w-[1240px] lg:w-[900px] md:w-[700px] sm:w-[600px]  columns-2 mx-5 mb-20">
      {children}
    </div>
  );
}

export default PostsLayout

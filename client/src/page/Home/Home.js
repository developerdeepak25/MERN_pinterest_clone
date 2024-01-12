import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import PostsLayout from "../../components/PostsGrid/PostsLayout";

const Home = () => {
  // const [userData, setUserData] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getDataFromServer = async () => {
      try {
        const resData = await axios.get("/image/getalldata");
        console.log(
          "🚀 ~ file: Home.js:10 ~ getDataFromServer ~ resData:",
          resData
        );
        const { posts } = resData.data;
        // console.log('getalldata',resData.data);
        // setUserData(data);
        if (posts) {
          setPosts(posts);
        }
        console.log(posts);
      } catch (error) {
        console.log(error);
      }
    };
    getDataFromServer();
  }, []);
  return (
    <>
      {/* <h2>{userData.email}</h2> */}
      {/* <h1>this is the home component</h1> */}
      <div className="posts-container pt-8 minus-nav-100vh ">
        <PostsLayout postsCount={posts.length} fallback={"Nothing to see yet."}>
          {" "}
          {posts &&
            posts.map((post, i) => {
              return <Post data={post} key={i} />;
            })}
        </PostsLayout>
      </div>
    </>
  );
};

export default Home;

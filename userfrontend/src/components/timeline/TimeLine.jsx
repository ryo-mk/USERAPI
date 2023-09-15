import React, { useState, useEffect } from 'react';
import "./TimeLine.css";
import Share from '../share/Share';
import Post from '../post/Post';
// import { Posts } from "../../dummyData";
import axios from "axios";

export default function TimeLine() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/users/1");
      // console.log(response);
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className='timeline'>
      <div className="timeLineWrapper">
        <Share />
        {/* {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))} */}
      </div>
    </div>
  )
}

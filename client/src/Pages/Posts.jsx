import React, { useEffect } from "react";
import axios from "axios";

const Posts = () => {
  async function getpost() {
    try {
      const post = await axios.get("hhtp://localhost:8080", {
        withCredentials: true,
      });
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getpost();
  }, []);
  return <div>posts</div>;
};

export default Posts;

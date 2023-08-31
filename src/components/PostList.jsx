import React, { useEffect, useState } from "react";
import axios from "axios";

const PostList = () => {
  const [postId, setPostID] = useState(1);
  const [getPostId, setGetPostId] = useState(1);
  const [post, setPost] = useState({});
  const [error, setError] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    setGetPostId(postId);
  };
  const clickHandler = () => {
    setGetPostId(postId);
  };

  const getData = async () => {
    
    try {
      setError('')
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      setPost(response.data)
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [getPostId]);

  return (
    <>
      <form onSubmit={submitHandler}>
          <label htmlFor="id">please enter post number:</label>
        <div className="parent">
          <input
            type="number"
            id="id"
            value={postId}
            onChange={(e) => {
              setPostID(parseInt(e.target.value));
            }}
          />
          <span className="error">{error ? error : null}</span>
        </div>
        <button type="submit" onClick={clickHandler}>
          Fetch Post
        </button>
      </form>
      <div>
        <h2>id:{post.id}</h2>
        <span>
          <strong>title</strong>: {post.title}
        </span>
      </div>
    </>
  );
};

export default PostList;

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
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    try {
      response.status === 200
        ? (() => {
            setPost(response.data);
            setError("");
          })()
        : (() => {
            throw Error(`Sorry, ${response.status} bad request`);
          })();
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    getData();
  }, [getPostId]);

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="parent">
          <label htmlFor="id">please enter post number:</label>
          <input
            type="number"
            id="id"
            value={postId}
            onChange={(e) => {
              setPostID(parseInt(e.target.value));
            }}
          />
          <span>{error ? error : null}</span>
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

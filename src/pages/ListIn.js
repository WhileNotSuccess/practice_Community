import React, { useEffect, useState } from "react";
import axios from "../lib/axios.js";
import ListInCompo from "../components/ListInCompo.js";
import { Navigate, useParams } from "react-router-dom";
import Comment from "../components/Comment.jsx";
import "../css/ListInComp.css";
import { useAuth } from "../hooks/auth.js";

const ListIn = () => {
  const [post, sPost] = useState({});
  const [content, sContent] = useState("");
  const [urender, urRender] = useState(false);
  const [comment, sComment] = useState([]);
  const id = useParams().id;
  const { user } = useAuth({
    middleware: "guest",
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then((res) => res.data.data)
      .then((data) => sPost(data))
      .then(
        axios
          .get(`http://localhost:8000/api/comments?post-id=${id}`)
          .then((res) => res.data.data)
          .then((data) => sComment(data))
      );
  }, [urender]);
  const confirm = (e) => {
    e.preventDefault();
    if (content !== "") {
      commentOn();
    }
    urRender(!urender);
    sContent("");
  };
  const updater = () => {
    // Navigate("http://localhost:3000/");
  };
  const deleter = () => {
    axios.delete(`http://localhost:8000/api/post/${id}`);
    Navigate("http://localhost:3000/");
  };
  const commentOn = () => {
    axios.post(`http://localhost:8000/api/comments`, {
      postId: `${id}`,
      content: content,
    });
  };

  return (
    <div className="main">
      <ListInCompo
        category={post.category}
        author={post.author}
        date={post.updated_at}
        title={post.title}
      />
      <div id="line">
        <div className="listButton">
          <button onClick={updater}>글 수정</button>
          <button onClick={deleter}>글 삭제</button>
        </div>
        <div>
          <h3>내용</h3>
          {post.content}
        </div>
      </div>
      <hr />
      <div id="form">
        <form onSubmit={confirm}>
          <input
            type="text"
            value={content}
            onChange={(e) => sContent(e.target.value)}
          />
          <button>작성</button>
        </form>
      </div>
      {comment.map((data) => {
        return (
          <Comment
            key={data.id}
            data={data}
            urender={urender}
            urRender={urRender}
            user={user?.nick_name}
          />
        );
      })}
    </div>
  );
};

export default ListIn;

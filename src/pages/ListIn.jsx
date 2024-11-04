import React, { useEffect, useState } from "react";
import axios from "../lib/axios.js";
import ListInCompo from "../components/ListInComp.js";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment.jsx";
import "../css/ListInComp.css";
import { useAuth } from "../hooks/auth.js";
import HTMLReactParser from "html-react-parser/lib/index";

const ListIn = () => {
  const [post, sPost] = useState({});
  const [content, sContent] = useState("");
  const [urender, urRender] = useState(false);
  const [comment, sComment] = useState([]);
  const [listcon, sListcon] = useState("");
  const [conid, sConid] = useState(0);
  const id = useParams().id;
  const navi = useNavigate();
  const { user } = useAuth({
    middleware: "guest",
  });
  const check = () => {
    console.log(user);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then((res) => res.data.data)
      .then((data) => {
        sPost(data);
        sListcon(data.content);
      })
      .then(
        axios
          .get(`http://localhost:8000/api/comments?post-id=${id}`)
          .then((res) => res.data.data)
          .then((data) => {
            sComment(data);
          })
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
    navi(`/post-update/${id}`);
  };
  const deleter = () => {
    axios.delete(`http://localhost:8000/api/post/${id}`);
    navi("/");
  };
  const commentOn = () => {
    axios.post(`http://localhost:8000/api/comments`, {
      postId: `${id}`,
      content: content,
    });
  };

  return (
    <div className="listmain">
      <button onClick={check}>check</button>
      <ListInCompo
        category={post.category}
        author={post.author}
        date={post.updated_at}
        title={post.title}
      />
      {user?.nick_name === post.author ? (
        <div className="listButton">
          <button onClick={updater}>글 수정</button>
          <button onClick={deleter}>글 삭제</button>
        </div>
      ) : null}
      <div id="line">
        <h3>내용</h3>
        <div>{HTMLReactParser(listcon)}</div>
      </div>

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
      <div className="announceComment">댓글</div>
      {comment.map((data) => {
        return (
          <Comment
            key={data.id}
            data={data}
            urender={urender}
            urRender={urRender}
            user={user?.nick_name}
            conid={conid}
            sConid={sConid}
          />
        );
      })}
    </div>
  );
};

export default ListIn;

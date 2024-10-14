import React, { useEffect, useState } from "react";
import axios from "axios";
import Comment from "./Comment";
import ListCompo from "./ListCompo";
import { Navigate } from "react-router-dom";

const ListIn = ({ id }) => {
  const [data, setdata] = useState([]);

  id = 1;
  const updater = () => {};
  const deleter = () => {
    axios.delete(`http://127.0.0.1:8000/api/posts/${id}`).then(); //response로 지워야할 comment의 id 받아올 수 있는가?
    Navigate("http://localhost:3000");
  };
  //댓글 삭제
  const deleteCom = ({ id }) => {
    axios.delete(`http://127.0.0.1:8000/api/comments/${id}`).then();
  };
  //대댓글 삭제
  const deleteNeCom = ({ id }) => {
    axios.delete(`http://127.0.0.1:8000/api/nested-comments/${id}`);
  };
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/posts/${id}`)
      .then((res) => res.data.data)
      .then((data) => {
        setdata(data);
      });
  }, [id]);
  return (
    <div>
      <ListCompo
        category={data.category}
        author={data.author}
        date={data.updated_at}
        title={data.title}
      />
      <div>
        <button onClick={updater}>글 수정</button>
        <button onClick={deleter}>글 삭제</button>
      </div>

      <div>
        <h3>내용</h3>
        <text>{data.content}</text>
      </div>
      <hr />
      <button>댓글 작성</button>

      <Comment id={id} deleteCom={deleteCom} deleteNeCom={deleteNeCom} />
    </div>
  );
};

export default ListIn;

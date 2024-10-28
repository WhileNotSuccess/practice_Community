import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import NComment from "./NComment";
import "../css/ListInComp.css";
import B from "../img/arrow_down.png";
import C from "../img/arrow_up.png";

const Comment = ({ data, urender, urRender, user }) => {
  const [datad, sDatad] = useState([]);
  const [appear, nAppear] = useState(false);
  const [content, sContent] = useState("");
  const [render, sRender] = useState(false);
  const [cAppear, sCAppear] = useState(false);
  const [hide, sHide] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/nested-comments?comment-id=${data.id}`)
      .then((res) => res.data.data)
      .then((data) => sDatad(data));
  }, [data, render]);
  const deleter = () => {
    axios.delete(`http://localhost:8000/api/comments/${data.id}`);
    urRender(!urender);
  };
  const remake = () => {
    axios.put(`http://localhost:8000/api/comments/${data.id}`, {
      content: content,
    });
    sContent("");
    urRender(!urender);
    nAppear(!appear);
  };
  const nComment = () => {
    axios.post(`http://localhost:8000/api/nested-comments`, {
      commentId: `${data.id}`,
      content: content,
    });
    sContent("");
    sRender(!render);
    sCAppear(!cAppear);
  };
  return (
    <div className="comment">
      <div className="incomment">
        <div>{data.content}</div>
        {user === data.author ? (
          <div className="button">
            {cAppear ^ appear ? null : (
              <>
                <button
                  onClick={() => {
                    sCAppear(!cAppear);
                  }}
                >
                  대댓글 작성
                </button>
                <button
                  onClick={() => {
                    nAppear(!appear);
                  }}
                >
                  수정
                </button>
                <button onClick={deleter}>삭제</button>
              </>
            )}

            {appear ? (
              <>
                <input
                  type="textbox"
                  value={content}
                  onChange={(e) => sContent(e.target.value)}
                />
                <button onClick={remake}>완료</button>
              </>
            ) : null}
            {cAppear ? (
              <>
                <input
                  type="textbox"
                  value={content}
                  onChange={(e) => sContent(e.target.value)}
                />
                <button onClick={nComment}>완료</button>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
      <label for={hide} onClick={() => sHide(!hide)}>
        {hide ? <img src={C} alt="" /> : <img src={B} alt="" />}
        {datad.length}개의 대댓글
      </label>
      {hide
        ? datad.map((att) => {
            return (
              <NComment
                key={att.id}
                data={att}
                render={render}
                sRender={sRender}
                user={user}
              />
            );
          })
        : null}
    </div>
  );
};

export default Comment;

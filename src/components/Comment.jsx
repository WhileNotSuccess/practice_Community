import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import NComment from "./NComment";
import "../css/ListInComp.css";
import B from "../img/arrow_down.png";
import C from "../img/arrow_up.png";

const Comment = ({ data, urender, urRender, user, conid, sConid }) => {
  const [datad, sDatad] = useState([]);

  const [content, sContent] = useState("");
  const [render, sRender] = useState(false);
  const [cAppear, sCAppear] = useState(false);
  const [appear, nAppear] = useState(false);
  const configer = () => {
    if (cAppear && appear === false) {
      if (cAppear) {
        nComment();
      } else if (appear) {
        remake();
      }
      sContent("");
      urRender(!urender);
    }
  };
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
    nAppear(false);
  };
  const nComment = () => {
    axios.post(`http://localhost:8000/api/nested-comments`, {
      commentId: `${data.id}`,
      content: content,
    });
    sCAppear(false);
  };
  return (
    <div className="comment">
      <div className="incomment">
        <div>{data.content}</div>

        <div className="button">
          {cAppear ^ appear && conid === data.id ? (
            <>
              <input
                type="textbox"
                value={content}
                onChange={(e) => sContent(e.target.value)}
              />
              <button onClick={configer}>완료</button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  sConid(data.id);
                  sCAppear(!cAppear);
                }}
              >
                대댓글 작성
              </button>
              {user === data.author ? (
                <>
                  <button
                    onClick={() => {
                      sConid(data.id);
                      nAppear(!appear);
                    }}
                  >
                    수정
                  </button>
                  <button onClick={deleter}>삭제</button>
                </>
              ) : null}
            </>
          )}
        </div>
      </div>
      {datad.length === 0 ? null : (
        <label for={hide} onClick={() => sHide(!hide)}>
          {hide ? <img src={C} alt="" /> : <img src={B} alt="" />}
          {datad.length}개의 대댓글
        </label>
      )}

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

import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import "../css/ListInComp.css";
import A from "../img/enter2.png";
const NComment = ({ data, render, sRender, user }) => {
  const [nestComment, sNestComment] = useState({});

  const [appear, nAppear] = useState(false);
  const [content, sContent] = useState("");

  const deleter = () => {
    axios.delete(`http://localhost:8000/api/nested-comments/${nestComment.id}`);
    sRender(!render);
  };
  const remake = async () => {
    await axios.put(
      `http://localhost:8000/api/nested-comments/${nestComment.id}`,
      {
        content: content,
      }
    );

    sContent("");
    nAppear(!appear);
    sRender(!render);
  };
  useEffect(() => {
    sNestComment(data);
  }, [data]);

  return (
    <div className="ncomment">
      <div className="incomment">
        <div>
          <img src={A} alt={""} />
          {nestComment.content}
        </div>
        {nestComment.author === user ? (
          <div className="nbutton">
            {appear ? (
              <>
                <input
                  type="textbox"
                  value={content}
                  onChange={(e) => sContent(e.target.value)}
                />
                <button onClick={remake}>완료</button>
              </>
            ) : (
              <>
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
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NComment;

import React, { useState } from "react";
import "../css/MainComp.css";
import { useNavigate } from "react-router-dom";

const PostList = ({ list }) => {
  const [user, setUser] = useState(null); // 작성자 이름 담을 변수
  const [display, setDisplay] = useState({ x: 0, y: 0 }); // 마우스 우클릭 한 위치를 담을 변수
  const navig = useNavigate();

  const rightClick = (e, user) => {
    //마우스 우클릭함수
    e.preventDefault(); // 브라우저 기본 우클릭 막는 코드
    setDisplay({ x: e.clientX, y: e.clientY });
    setUser(user);
  };

  const closeMenu = (user) => {
    // 정보보기 창 닫기 함수
    console.log(user);
    // navig(`/`,{state:{author:user}}); user페이지 라우트 생기면 활성화
    setUser(null);
  };

  return (
    <>
      {list.map((item) => {
        const date = item.createdAt.substring(0, 10);
        const user = item.author;
        return (
          <div className="line-change" key={item.id} onClick={closeMenu}>
            <span onClick={() => navig(`/list-in/${item.id}`)}>
              [{item.category}] {item.title}
            </span>
            <span
              className="user-value"
              onContextMenu={(e) => rightClick(e, item.author)}
              style={{ display: "inline-block" }}
            >
              {user}
            </span>
            <span className="post-date">{date}</span>
          </div>
        );
      })}
      {user && (
        <div
          className="context-menu"
          style={{
            position: "fixed",
            top: `${display.y}px`,
            left: `${display.x}px`,
          }}
        >
          <button onClick={closeMenu}>x</button>
          <div className="menu-item" onClick={() => closeMenu(user)}>
            정보보기
          </div>
        </div>
      )}
    </>
  );
};

export default PostList;

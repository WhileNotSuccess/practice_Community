import axios from "axios";
import React, { useEffect, useState } from "react";
import { CategoryCompo } from "../components/CategoryCompo";
import { UserInfoCompo } from "../components/MainComp";
import "../css/UserPage.css";
import { useLocation, useNavigate } from "react-router-dom";

const UserPage = () => {
  const location = useLocation();
  const userName = location.state;
  const [userData, setUserData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("post"); // 선택된 탭 상태 추가
  const navig = useNavigate();

  const postData = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/search?content=${userName}&target=author&limit=10&page=1`
    );
    setUserData(data.data);
  };

  const commentData = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/search?content=Lessie-Konopelski-IV&target=author&limit=10&page=1`
    );
    setUserData(data.data);
  };

  useEffect(() => {
    postData();
  }, []);

  return (
    <div className="info-container">
      <CategoryCompo />
      <div className="info-list">
        <h1 className="info-name">{userName}</h1>
        <div className="info-select">
          <button
            className={`select-post ${selectedTab === "post" ? "active" : ""}`}
            onClick={() => {
              postData();
              setSelectedTab("post");
            }}
          >
            작성글
          </button>
          <button
            className={`select-comment ${
              selectedTab === "comment" ? "active" : ""
            }`}
            onClick={() => {
              commentData();
              setSelectedTab("comment");
            }}
          >
            댓글단 글
          </button>
        </div>
        <div className="info-header">
          <span className="info-title">글 제목</span>
          <span className="info-date">작성일자</span>
        </div>
        {userData.map((item) => {
          const date = item.createdAt.substring(0, 10);
          const user = item.author;
          return (
            <div className="line-change" key={item.id}>
              <span onClick={() => navig(`/list-in/${item.id}`)}>
                [{item.category}] {item.title}
              </span>
              <span className="post-date">{date}</span>
            </div>
          );
        })}
      </div>
      <UserInfoCompo />
    </div>
  );
};

export default UserPage;

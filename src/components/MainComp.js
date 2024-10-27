import React from "react";
import "../css/MainComp.css";
import axios from "axios";
import { Link } from "react-router-dom";

export const MainCompo = (props) => {
  return (
    <div className="line-change">
      <span>
        [{props.category}] {props.title}
        <br />
      </span>
    </div>
  );
};

export const CreateCategory = ({ boardName, categoryChange }) => {
  const CategoryButton = () => {
    categoryChange(boardName);
  };

  return (
    <div className="line-change">
      <span onClick={CategoryButton}>
        {boardName}
        <br />
      </span>
    </div>
  );
};

export const UserInfoCompo = () => {
  return (
    <div className="user-info">
      <div className="user-login"></div>
      <Link to="/login" className="logout-btn">
        로그인
      </Link>)
    }
export const UserInfoCompo = (props) => {
  return (
    <div className="user-info">
      {props.user ? (
        <>
          <div className="user-login">{props.user.nick_name}</div>
          <Link to="/login" className="logout-btn">
            로그아웃
          </Link>
        </>
      ) : (
        <>
          <div className="user-login">로그인</div>
          <Link to="/sign-in" className="logout-btn">
            회원가입
          </Link>
        </>
      )}
    </div>
  );
};

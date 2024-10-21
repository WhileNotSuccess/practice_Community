import React from "react";
import "../css/MainComp.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";
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
      </Link>
    </div>
  );
};

export const CategoryCompo = ({
  setCategoryList,
  categoryList,
  category,
  categoryChange,
}) => {
  useEffect(() => {
    fetchCategories();
  }, [category]);

  const fetchCategories = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/category`);
    setCategoryList(data.data);
  };

  return (
    <div className="board-tag">
      <div className="board-list">
        {categoryList.map((data) => (
          <CreateCategory
            key={data.id}
            boardName={data.boardName}
            categoryChange={categoryChange}
          />
        ))}
      </div>
    </div>
  );
};

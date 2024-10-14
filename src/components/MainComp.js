import React from "react";
import "../css/MainComp.css";
import axios from "axios";

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

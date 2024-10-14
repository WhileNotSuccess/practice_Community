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

export const SelectCategory = ({ category, categoryChange }) => {
  const CategoryButton = () => {
    categoryChange(category);
  };
  return (
    <div className="line-change">
      <span onClick={CategoryButton}>
        {category}
        <br />
      </span>
    </div>
  );
};

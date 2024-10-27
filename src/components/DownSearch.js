import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import searchIcon from "../img/search.jpg";

const DownSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const target = useSelector((state) => state.target);
  const [downSearchInput, setDownSearchInput] = useState("");

  const onChange = (e) => {
    setDownSearchInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      inputExist();
    }
  };

  const inputExist = () => {
    if (downSearchInput === "") {
      alert("내용을 입력해주세요.");
    } else {
      navigate("/search-result", {
        state: { searchInput: downSearchInput, target },
      });
    }
  };

  return (
    <div className="down-rectangle">
      <select
        className="select-target"
        value={target}
        onChange={(e) => {
          dispatch({ type: "TARGET_CHANGE", payload: e.target.value });
        }}
      >
        <option value={"title"}>제목</option>
        <option value={"content"}>내용</option>
        <option value={"author"}>작성자</option>
      </select>
      <input
        className="search-box"
        placeholder="내용을 입력하세요."
        value={downSearchInput}
        onChange={onChange}
        onKeyUp={handleKeyPress}
      />
      <button className="search-icon" onClick={inputExist}>
        <img src={searchIcon} alt="Search" />
      </button>
    </div>
  );
};

export default DownSearch;

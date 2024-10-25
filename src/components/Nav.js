/* Nav.js */
import { React, useState, KeyboardEvent } from "react";
import "../css/Nav.css";
import { Link, useNavigate } from "react-router-dom";
import "../App";
import searchIcon from "../img/search.jpg";

const Nav = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setSearchInput(e.target.value);
  };
  const inputExist = () => {
    searchInput == ""
      ? alert("내용을 입력해주세요.")
      : navigate("/search-result", {
          state: { searchInput: searchInput, category: "자유게시판" },
        });
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      inputExist();
    }
  };

  return (
    <div className="parent">
      <div className="header">
        <Link to="/" className="logo"></Link>

        <div className="rectangle">
          <input
            className="search-box"
            placeholder="내용을 입력하세요."
            value={searchInput}
            onChange={onChange}
            onKeyUp={handleKeyPress}
          />
          <button className="search-icon" onClick={inputExist}>
            <img src={searchIcon} alt="" />
          </button>
        </div>
      </div>
      <div className="banner"></div>
    </div>
  );
};

export default Nav;

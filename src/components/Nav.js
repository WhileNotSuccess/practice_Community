/* Nav.js */
import { React, useState, KeyboardEvent } from "react";
import "../css/Nav.css";
import { Link, useNavigate } from "react-router-dom";
import "../App";
import searchIcon from "../img/search.jpg";
import { useDispatch } from "react-redux";
import axios from '../lib/axios'

const Nav = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onChange = (e) => {
    setSearchInput(e.target.value);
  };
  const inputExist = () => {
    if (searchInput == "") {
      alert("내용을 입력해주세요.");
    } else {
      dispatch({ type: "TARGET_CHANGE", payload: "title" });
      navigate("/search-result", {
        state: { searchInput: searchInput },
      });
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      inputExist();
    }
  };
  const onSearch = (e) => {
    e.preventDefault()
    const content = searchInput.split(' ')
    axios.get(`http://localhost:8000/api/search?target=title&content=${content.join('-')}&category=자유게시판&limit=20`)
    .then(res=>console.log(res.data))
    .catch((e)=>console.log(e.response.data.message))
  }; /*  */

  return (
    <div className="parent">
      <div className="header">
        <Link to="/" className="logo"></Link>

        <div className="rectangle">
          <form onSubmit={onSearch}>
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
          </form>
        </div>
      </div>
      <div className="banner"></div>
    </div>
  );
};

export default Nav;

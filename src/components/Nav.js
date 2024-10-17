/* Nav.js */
import { React, useState } from "react";
import "../css/Nav.css";
import { Link } from "react-router-dom";
import searchIcon from "../img/search.jpg";
import axios from '../lib/axios'
const Nav = () => {
  const [searchInput, setSearchInput] = useState("");

  const onChange = (e) => {
    setSearchInput(e.target.value);
  };
  const onSearch = (e) => {
    e.preventDefault()
    const content = searchInput.split(' ')
    axios.get(`http://localhost:8000/api/search?target=tile&content=${content.join('-')}&category=자유게시판`)
    .then(res=>console.log(res.data))
    .catch((e)=>console.log(e.response.data.message))
  }; /*  */

  return (
    <div className="parent">
      <div className="header">
        <Link to="/">
          <div className="logo"></div>
        </Link>
        <div className="rectangle">
          <form onSubmit={onSearch}>
          <input
            className="search-box"
            placeholder="내용을 입력하세요."
            value={searchInput}
            onChange={onChange}
          />
          </form>
          
          <Link to="/search-result" state={{ searchInput: searchInput }}>
            <button className="search-icon">
              <img src={searchIcon} alt="" />
            </button>
          </Link>
        </div>
      </div>
      <div className="banner"></div>
    </div>
  );
};

export default Nav;

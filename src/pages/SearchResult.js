import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/SearchResult.css";
import "../css/MainComp.css";
import axios from "axios";
import { UserInfoCompo, CategoryCompo } from "../components/MainComp";
import PostList from "../components/PostList";
const SearchResult = () => {
  const [postPerPage, setPostPerPage] = useState(10);
  const location = useLocation();
  const [resultData, setResultData] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/search?content=${location.state}&target=title`
      )
      .then((res) => res.data)
      .then((data) => setResultData(data.data));
  }, [location.state]);
  console.log(resultData);
  return (
    <div className="container">
      <div className="post-list">
        <div className="options-container">
          <div className="category-name">검색 결과</div>
          <div className="options-right">
            <select
              className="page-select"
              value={postPerPage}
              onChange={(e) => {
                setPostPerPage(Number(e.target.value));
              }}
            >
              <option value={10}>10개씩</option>
              <option value={20}>20개씩</option>
              <option value={30}>30개씩</option>
            </select>
          </div>

          <div className="post-header">
            <span className="post-title">글 제목</span>
            <span className="post-date">작성일자</span>
          </div>
          <hr />
          {resultData.length > 0 ? <PostList list={resultData} /> : null}
        </div>
      </div>
      <UserInfoCompo />
    </div>
  );
};

export default SearchResult;

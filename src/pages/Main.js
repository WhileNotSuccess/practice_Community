import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/MainComp.css";
import { CategoryCompo } from "../components/CategoryCompo";
import { UserInfoCompo } from "../components/MainComp";
import Pagination from "../components/Pagination";
import PostList from "../components/PostList";
import searchIcon from "../img/search.jpg";
import { useDispatch, useSelector } from "react-redux";

const Main = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const currentPage = useSelector((state) => state.currentPage);
  const [posts, setPosts] = useState([]);
  /* const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 */
  /* const nextPage = useSelector((state) => state.nextPage); // 이전 페이지 */
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState(""); // 다음 페이지
  const [postPerPage, setPostPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [h_announce, setHAnnounce] = useState(true);
  const [notion, setNotion] = useState([]);
  const [downSearchInput, setDownSearchInput] = useState("");
  const fetchPosts = async (page) => {
    const { data } = await axios.get(
      `http://localhost:8000/api/posts?category=${category}&limit=${postPerPage}&page=${page}`
    );
    setPosts(data.data);
    dispatch({ type: "CURRENTPAGE_CHANGE", payload: data.currentPage });
    setNextPage(data.nextPage);
    setPrevPage(data.prevPage);
    setTotalPage(data.totalPage);
  };

  const fetchNotions = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/posts?category=공지사항&limit=2`
    );
    setNotion(data.data);
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [category, postPerPage]);

  useEffect(() => {
    fetchNotions();
  }, []);

  const pageChange = async (url) => {
    const { data } = await axios.get(url);
    setPosts(data.data);
    dispatch({ type: "CURRENTPAGE_CHANGE", payload: data.currentPage });
    setNextPage(data.nextPage);
    setPrevPage(data.prevPage);
    setTotalPage(data.totalPage);
  };

  const paginate = (pageNumber) => {
    fetchPosts(pageNumber);
  };

  const onChange = (e) => {
    setDownSearchInput(e.target.value);
  };
  return (
    <div className="container">
      <CategoryCompo />

      <div className="post-list">
        <div className="options-container">
          <div className="category-name">{category}</div>
          <div className="options-right">
            <form onClick={() => setHAnnounce(!h_announce)}>
              <input
                type="checkbox"
                checked={h_announce}
                onChange={() => setHAnnounce(!h_announce)}
              />
              공지숨기기
            </form>
            <select
              value={postPerPage}
              onChange={(e) => setPostPerPage(Number(e.target.value))}
              className="page-select"
            >
              <option value={10}>10개씩</option>
              <option value={20}>20개씩</option>
              <option value={30}>30개씩</option>
            </select>
          </div>
        </div>
        <div className="post-header">
          <span className="post-title">글 제목</span>
          <span className="post-date">작성일자</span>
        </div>
        <hr />
        {notion.length > 0 && !h_announce && <PostList list={notion} />}
        <hr />
        {posts.length > 0 && <PostList list={posts} />}
      </div>
      <UserInfoCompo />
      <div className="down-rectangle">
        <select>
          <option>제목</option>
          <option>내용</option>
          <option>작성자</option>
        </select>
        <input
          className="search-box"
          placeholder="내용을 입력하세요."
          value={downSearchInput}
          onChange={onChange}
        />
        <button className="search-icon">
          <img src={searchIcon} alt="" />
        </button>
      </div>
      <div className="down-banner">
        <Pagination
          postPerPage={postPerPage}
          totalPage={totalPage}
          paginate={paginate}
          currentPage={currentPage}
          prevPage={prevPage}
          nextPage={nextPage}
          pageChange={pageChange}
        />
      </div>
    </div>
  );
};

export default Main;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/MainComp.css";
import { CreateCategory, UserInfoCompo } from "../components/MainComp";
import Pagination from "../components/Pagination";
import PostList from "../components/PostList";
import BackArrow from "../img/arrow_back.jpg";
import ForwardArrow from "../img/arrow_forward.jpg";
import { Link } from "react-router-dom";
import { CategoryCompo } from "../components/MainComp";

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");
  const [postPerPage, setPostPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [category, setCategory] = useState("자유게시판");
  const [h_announce, setHAnnounce] = useState(true);
  const [notion, setNotion] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const fetchPosts = async (page = 1) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/posts?category=${category}&limit=${postPerPage}&page=${page}`
      );
      setPosts(data.data);
      setCurrentPage(data.currentPage);
      setNextPage(data.nextPage);
      setPrevPage(data.prevPage);
      setTotalPage(data.totalPage);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchNotions = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/posts?category=공지사항&limit=2`
      );
      setNotion(data.data);
    } catch (error) {
      console.error("Error fetching notions:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [category, postPerPage]);

  useEffect(() => {
    fetchNotions();
  }, []);

  const pageChange = async (url) => {
    const { data } = await axios.get(url);
    setPosts(data.data);
    setCurrentPage(data.currentPage);
    setNextPage(data.nextPage);
    setPrevPage(data.prevPage);
    setTotalPage(data.totalPage);
  };

  const paginate = (pageNumber) => {
    fetchPosts(pageNumber);
  };

  const categoryChange = (category) => {
    setCategory(category);
  };

  return (
    <div className="container">
      <CategoryCompo
        category={category}
        categoryChange={categoryChange}
        categoryList={categoryList}
        setCategoryList={setCategoryList}
      />

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
      <div className="down-banner">
        <button
          className="arrow-button"
          onClick={() => pageChange(`${prevPage}&limit=${postPerPage}`)}
          disabled={!prevPage}
        >
          <img src={BackArrow} alt="Previous" />
        </button>
        <Pagination
          postPerPage={postPerPage}
          totalPage={totalPage}
          paginate={paginate}
          currentPage={currentPage}
        />
        <button
          className="arrow-button"
          onClick={() => pageChange(`${nextPage}&limit=${postPerPage}`)}
          disabled={!nextPage}
        >
          <img src={ForwardArrow} alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default Main;

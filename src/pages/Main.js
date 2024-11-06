import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/MainComp.css";
import { CategoryCompo } from "../components/CategoryCompo";
import { UserInfoCompo } from "../components/MainComp";
import Pagination from "../components/Pagination";
import PostList from "../components/PostList";
import { useSelector } from "react-redux";
import DownSearch from "../components/DownSearch";
import { useAuth } from "../hooks/auth";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const category = useSelector((state) => state.category); // 카테고리
  const [posts, setPosts] = useState([]); // 메인에서 글 가져오기
  const [currentPage, setCurrentPage] = useState(""); // 현재 페이지
  const [nextPage, setNextPage] = useState(""); // 다음 페이지
  const [prevPage, setPrevPage] = useState(""); // 이전 페이지
  const [postPerPage, setPostPerPage] = useState(10); // 페이지에 띄울 글 갯수
  const [totalPage, setTotalPage] = useState(0); // 총 페이지
  const [h_announce, setHAnnounce] = useState(true); // 공지 숨기기
  const [notion, setNotion] = useState([]); // 공지내용 가져오기

  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchPosts = async (page) => {
    // 메인 페이지 글 가져오기
    const { data } = await axios.get(
      `http://localhost:8000/api/posts?category=${category}&limit=${postPerPage}&page=${page}
    `
    );
    setPosts(data.data);
    setCurrentPage(data.currentPage);
    setNextPage(data.nextPage);
    setPrevPage(data.prevPage);
    setTotalPage(data.totalPage);
  };

  const fetchNotions = async () => {
    // 공지사항 글 가져오기
    const { data } = await axios.get(
      `http://localhost:8000/api/posts?category=공지사항&limit=2
    `
    );
    setNotion(data.data);
  };

  useEffect(() => {
    fetchPosts(1); // 카테고리 변경 시 1페이지 데이터 로딩
  }, [category, postPerPage]);

  useEffect(() => {
    // 공지 글 로딩
    fetchNotions();
  }, []);

  // 페이지 변경 시 실제로 바뀌는 값
  const pageChange = async (url) => {
    if (url) {
      const { data } = await axios.get(url);
      setPosts(data.data);
      setCurrentPage(data.currentPage);
      setNextPage(data.nextPage);
      setPrevPage(data.prevPage);
      setTotalPage(data.totalPage);
    }
  };

  const paginate = (pageNumber) => {
    // 페이지값 변경
    fetchPosts(pageNumber);
  };

  const postButton = () => {
    navigate("/post");
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
          <span className="post-user">작성자</span>
          <span className="post-date">작성일자</span>
        </div>
        {notion.length > 0 && !h_announce && <PostList list={notion} />}
        {posts.length > 0 && <PostList list={posts} />}
      </div>
      <UserInfoCompo user={user} />

      <DownSearch />

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

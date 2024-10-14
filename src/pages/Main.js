import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/MainComp.css";
import { CreateCategory } from "../components/MainComp";
import Pagination from "../components/Pagination";
import PostList from "../components/PostList";
import BackArrow from "../img/arrow_back.jpg";
import ForwardArrow from "../img/arrow_forward.jpg";

const Main = () => {
  const [posts, setPosts] = useState([]); // 불러온 게시글 목록
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 (기본값 1로 설정)
  const [nextPage, setNextPage] = useState(""); // 다음 페이지
  const [prevPage, setPrevPage] = useState(""); // 이전 페이지
  const [postPerPage, setPostPerPage] = useState(10); // 페이지마다 띄울 게시글 갯수
  const [totalPage, setTotalPage] = useState(0); // 전체 페이지 수
  const [category, setCategory] = useState("자유게시판");
  const [h_announce, sh_announce] = useState(true);
  const [notion, setNotion] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const fetchPosts = (page = 1) => {
    axios
      .get(
        `http://localhost:8000/api/posts?category=${category}&limit=${postPerPage}&page=${page}`
      )
      .then((res) => res.data)
      .then((data) => {
        setPosts(data.data);
        setCurrentPage(data.currentPage);
        setNextPage(data.nextPage);
        setPrevPage(data.prevPage);
        setTotalPage(data.totalPage);
      });
  };

  useEffect(() => {
    categoryValue();
    fetchPosts();
  }, [category, postPerPage]);

  const categoryValue = async () => {
    await axios
      .get(`http://localhost:8000/api/category`)
      .then((data) => setCategoryList(data.data.data))
      .then(console.log(categoryList));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts?category=공지사항&limit=2`)
      .then((notion) => setNotion(notion.data.data));
  }, []);

  const pageChange = (url) => {
    axios
      .get(url)
      .then((res) => res.data)
      .then((data) => {
        setPosts(data.data);
        setCurrentPage(data.currentPage);
        setNextPage(data.nextPage);
        setPrevPage(data.prevPage);
        setTotalPage(data.totalPage);
      });
  };

  const paginate = (pageNumber) => {
    fetchPosts(pageNumber);
  };

  const categoryChange = (category) => {
    setCategory(category);
  };

  return (
    <>
      <div className="container">
        <div className="board-tag">
          <div className="board-list">
            {categoryList.map((data) => (
              <CreateCategory
                key={data.id}
                boardName={data.boardName}
                categoryChange={categoryChange}
              />
            ))}
          </div>
        </div>
        <div className="post-list">
          <div className="options-container">
            <div className="category-name">{category}</div>

            <div className="options-right">
              <form
                onClick={() => {
                  sh_announce(!h_announce);
                }}
              >
                <input
                  type="checkbox"
                  checked={h_announce}
                  onChange={() => sh_announce(!h_announce)}
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
          {notion.length > 0 && !h_announce ? <PostList list={notion} /> : null}

          <hr />

          {posts.length > 0 ? <PostList list={posts} /> : null}
        </div>
        <div className="user-info">
          <div className="user-login"></div>
          <div className="logout-btn"></div>
        </div>
      </div>
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
    </>
  );
};

export default Main;

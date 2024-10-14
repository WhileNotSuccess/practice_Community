import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/SearchResult.css";
import "../css/MainComp.css";
import axios from "axios";
import { MainCompo, SelectCategory } from "../components/MainComp";

const SearchResult = () => {
  const location = useLocation();
  const { searchInput } = location.state || {};
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/list").then((response) => {
      setData(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/category").then((response) => {
      setCategory(response.data);
    });
  }, []);

  const filteredData = data.filter(
    (item) =>
      item.title && item.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    const today = new Date();
    setDate(
      today
        .toLocaleDateString("ko-kr", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\. /g, "/")
        .replace(/\.$/, "")
    );
  }, []);

  return (
    <div className="container">
      <div className="board-tag">
        <div className="board-list">
          {category.map((cat) => (
            <SelectCategory key={cat.id} category={cat} />
          ))}
        </div>
      </div>
      <div className="post-list">
        <h1>검색 결과</h1>
        <ul>
          {filteredData.length > 0 && searchInput.length > 0 ? (
            filteredData.map((item) => (
              <MainCompo
                key={item.id}
                title={item.title}
                category={item.category}
                date={date}
              />
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </ul>
      </div>
      <div className="user-info">
        <div className="user-login"></div>
        <div className="logout-btn"></div>
      </div>
    </div>
  );
};

export default SearchResult;

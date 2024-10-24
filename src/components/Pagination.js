import React, { useState, useEffect } from "react";
import "../css/MainComp.css";
import BackArrow from "../img/arrow_back.jpg";
import ForwardArrow from "../img/arrow_forward.jpg";
const Pagination = ({
  postPerPage,
  prevPage,
  nextPage,
  totalPage,
  paginate,
  currentPage,
  pageChange,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <button
        className="arrow-button"
        onClick={() => pageChange(`${prevPage}&limit=${postPerPage}`)}
        disabled={!prevPage}
      >
        <img src={BackArrow} alt="Previous" />
      </button>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? "active" : ""}>
            <a onClick={() => paginate(number)}>{number}</a>
          </li>
        ))}
      </ul>
      <button
        className="arrow-button"
        onClick={() =>
          pageChange(`http://localhost:8000/${nextPage}&limit=${postPerPage}`)
        }
        disabled={!nextPage}
      >
        <img src={ForwardArrow} alt="Next" />
      </button>
    </>
  );
};

export default Pagination;

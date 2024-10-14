import React from "react";
import "../css/MainComp.css";

const Pagination = ({ postPerPage, totalPage, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }
  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li key={number} className={currentPage === number ? "active" : ""}>
          <a onClick={() => paginate(number)} href="#!">
            {number}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;

import React from "react";

const ListCompo = ({ category, title, date, author }) => {
  return (
    <>
      <div className="title-board">
        <h3>
          [{category}]{title}
        </h3>
      </div>
      <div className="author">작성자:{author}</div>
    </>
  );
};

export default ListCompo;

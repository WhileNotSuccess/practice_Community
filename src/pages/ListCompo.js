import React from "react";

const ListCompo = ({ category, title, date, author }) => {
  return (
    <div>
      <h4>
        [{category}]{title}
      </h4>
      <text>{date}</text>
      <text>{author}</text>
    </div>
  );
};

export default ListCompo;

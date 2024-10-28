import React from "react";

const ListCompo = ({ category, title, date, author }) => {
  return (
    <div>
      <h4>
        [{category}]{title}
      </h4>
      <h5>{author}</h5>
    </div>
  );
};

export default ListCompo;

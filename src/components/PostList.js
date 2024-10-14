import React from "react";
import "../css/MainComp.css";

const PostList = ({ list }) => {
  return (
    <>
      {list.map((item) => {
        const date = item.createdAt.substring(0, 10);
        return (
          <div className="line-change" key={item.id}>
            <span>
              [{item.category}] {item.title}
            </span>
            <span className="date">{date}</span>
          </div>
        );
      })}
    </>
  );
};

export default PostList;

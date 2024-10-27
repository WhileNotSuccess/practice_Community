import React from "react";
import "../css/MainComp.css";

const PostList = ({ list }) => {
  return (
    <>
      {list.map((item) => {
        const date = item.createdAt.substring(0, 10);
        const user = item.author;
        return (
          <div className="line-change" key={item.id}>
            <span>
              [{item.category}] {item.title}
            </span>
            <span className="user-value">{user}</span>
            <span className="post-date">{date}</span>
          </div>
        );
      })}
    </>
  );
};

export default PostList;

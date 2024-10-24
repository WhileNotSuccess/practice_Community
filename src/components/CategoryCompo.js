import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CreateCategory } from "../components/MainComp";
import { useNavigate } from "react-router-dom";
export const CategoryCompo = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const navigate = useNavigate();
  const fetchCategories = async () => {
    const { data } = await axios.get("http://localhost:8000/api/category");
    dispatch({ type: "CATEGORYLIST_UPLOAD", payload: data.data });
  };

  useEffect(() => {
    fetchCategories();
  }, [dispatch]);

  const categoryChange = (category) => {
    dispatch({ type: "CATEGORY_CHANGE", payload: category });

    navigate("/", { state: { category: category } });
  };

  return (
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
  );
};

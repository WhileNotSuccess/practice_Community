const initialState = {
  category: "자유게시판",
  categoryList: [],
  currentPage: 0,
  prevPage: "",
  nextPage: "",
  postPerPage: 10,
  totalPage: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CATEGORYLIST_UPLOAD":
      return { ...state, categoryList: action.payload };
    case "CATEGORY_CHANGE":
      return { ...state, category: action.payload };
    case "CURRENTPAGE_CHANGE":
      return { ...state, currentPage: action.payload };
    case "PREVPAGE_CHANGE":
      return { ...state, prevPage: action.payload };
    case "NEXTPAGE_CHANGE":
      return { ...state, nextPage: action.payload };
    case "POSTPERPAGE_CHANGE":
      return { ...state, postPerPage: action.payload };
    case "TOTALPAGE_CHANGE":
      return { ...state, totalpage: action.payload };
    default:
      return state;
  }
};

export default rootReducer;

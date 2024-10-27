import axios from "../lib/axios";
import React, { useEffect, useState } from "react";
import ReactHtmlParser from "html-react-parser"; //서버로부터 html형식을받아 화면에 출력하기 위한 모듈

const ParserTest = () => {
  const [test, setTest] = useState(""); //usestate로 서버로부터 응답을 받을 변수

  useEffect(() => {
    axios.get("http://localhost:8000/api/posts/1007").then((res) => {
      //특정 id(이미지 업로드 되있는 게시글)로 응답을 요청
      console.log(res.data.data.content);
      setTest(res.data.data.content);
    });
  }, []);
  return <div>{ReactHtmlParser(test)}</div>;
};

export default ParserTest;

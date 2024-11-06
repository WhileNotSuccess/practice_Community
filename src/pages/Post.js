import React, { useState, useEffect } from "react";
import "../css/PostComp.css";
import { UserInfoCompo } from "../components/MainComp"; // 사용자 정보 컴포넌트
import { CategoryCompo } from "../components/CategoryCompo"; // 게시판 이름 컴포넌트
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 navigate
import { CKEditor } from "@ckeditor/ckeditor5-react"; // CK에디터 컴포넌트
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"; // CK에디터의 클래식 에디터 빌드 import
import { useAuth } from "../hooks/auth"; // 로그인 확인용

// CK에디터에서 이미지를 서버로 업로드 하기 위해 작성한 클래스
class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader; // 파일 로더를 받아서 인스턴스에 저장
  }

  // 이미지 업로드 메서드
  async upload() {
    try {
      const file = await this.loader.file; // 이미지를 로드가 끝나고나서 실행해야해서 await사용
      console.log("Loaded file:", file);

      const data = new FormData(); // 폼데이터 객체 생성
      data.append("image", file); // 폼데이터에 image를 key로 한 image파일 추가

      // 이미지 파일을 서버에 업로드
      const res = await axios.post(
        // 서버로 부터 url을 반환해 res라는 변수에 저장
        "http://localhost:8000/api/image-upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // 폼데이터 보낼때 작성하는 헤더
          },
        }
      );

      const imgUrl = res.data; // 서버에서 반환된 url 저장
      console.log(res.data);
      return { default: imgUrl }; // 에디터에 표시될 이미지 url 반환
    } catch (error) {
      throw error; // 업로드 실패 시 에러 처리
    }
  }
}

// 게시글 작성 컴포넌트
const Post = () => {
  const [boardName, setBoardName] = useState("자유게시판"); // 게시판 이름 상태변수
  const [title, setTitle] = useState(""); // 제목 상태변수
  const [content, setContent] = useState(""); // 내용 상태변수

  const navigate = useNavigate(); // 페이지 이동을 위한 navigate

  const { user, isLoading } = useAuth(); // 로그인 여부와 로그인한 유저의 이름을 가져오기위한 함수

  useEffect(() => {
    if (!isLoading && !user) {
      // 유저가 로그인하지 않았으면 메인페이지로 돌려보냄
      alert("로그인 후 이용해주세요"); // 경고창 출력
      navigate("/"); // 메인 페이지로 이동
    }
  }, [user, isLoading, navigate]); // 사용자 상태와 로딩 상태에 따라 실행

  const adapter = (editorInstance) => {
    // CK에디터에서 사용할 이미지 업로드 어댑터 연결 함수
    editorInstance.plugins.get("FileRepository").createUploadAdapter = (
      loader
    ) => {
      return new MyUploadAdapter(loader); // MyUploadAdapter를 로더에 연결
    };
  };

  // 메인 페이지로 이동하는 함수
  const GoToMain = () => {
    navigate("/"); // 메인 페이지로 이동
  };

  // 제목 입력 시 호출되는 함수
  const titlechange = (e) => {
    setTitle(e.target.value); // 제목 상태 업데이트
    console.log(title);
  };

  // 게시글을 업로드하는 함수
  const onclick = async (boardName) => {
    try {
      // 폼데이터 객체 생성 및 게시글 정보 추가
      const formData = new FormData();
      formData.append("title", title); // 제목 추가
      formData.append("content", content); // 내용 추가
      formData.append("category", boardName); // 카테고리 추가

      // 서버에 게시글 데이터 전송
      const res = await axios.post(
        `http://localhost:8000/api/posts?category=${boardName}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("성공했습니다", res.data);
      navigate("/"); // 성공 시 메인 페이지로 이동
    } catch (error) {
      // 제목 또는 내용이 비어 있으면 경고 메시지 출력
      if (title === "") {
        alert("제목을 입력해주세요");
      }
      if (content === "") {
        alert("내용을 입력해주세요");
      }
      console.error("실패했습니다", error); // 에러 로그 출력
    }
  };

  return (
    <div className="post-board">
      <CategoryCompo />
      <div className="test">
        <div className="title-board">
          <select
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)} // 게시판 선택 시 상태 업데이트
            className="board-select"
          >
            <option value={"자유게시판"}>자유게시판</option>
            <option value={"공지사항"}>공지사항</option>
            <option value={"축제게시판"}>축제게시판</option>
          </select>
          <input placeholder="제목" onChange={titlechange}></input>{" "}
        </div>
        <div className="user-name">
          <>작성자 : {user ? user.nick_name : "로딩 중..."}</>{" "}
        </div>
        <div className="content-write">
          <div className="ckeditor">
            <CKEditor
              editor={ClassicEditor}
              data="" // 초기 데이터는 빈값으로 설정
              onReady={(editorInstance) => {
                adapter(editorInstance); // 에디터 준비 시 어댑터 연결
              }}
              onChange={(event, editorInstance) => {
                setContent(editorInstance.getData()); // 내용 변경 시 상태 업데이트
              }}
            />
          </div>
        </div>
        <div className="btns-box">
          <div className="upload-btn" onClick={() => onclick(boardName)}>
            <>업로드</>
          </div>
          <div className="upload-btn" onClick={GoToMain}>
            취소
          </div>
        </div>
      </div>
      <div>
        <UserInfoCompo user={user} />
      </div>
    </div>
  );
};

export default Post;

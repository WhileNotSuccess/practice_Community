import React, { useState, useEffect, ChangeEvent } from "react";
import "../css/PostComp.css";
import { UserInfoCompo } from "../components/MainComp";
import { CategoryCompo } from "../components/CategoryCompo";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useAuth } from "../hooks/auth";

// CKEditor에서 사용할 이미지 업로드 어댑터 클래스
class MyUploadAdapter {
  loader: any; // ck에디터의 loader객체가 어떤타입인지 몰라서 any로 정의

  constructor(loader: any) {
    this.loader = loader;
  }

  async upload(): Promise<{ default: string }> {
    // default는 url이고 url은 문자열로 사용되기 때문에 string으로 지정
    try {
      const file = await this.loader.file;
      const data = new FormData();
      data.append("image", file);

      const res = await axios.post(
        "http://localhost:8000/api/image-upload",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return { default: res.data };
    } catch (error) {
      throw error;
    }
  }
}

// 게시글 작성 컴포넌트
const Post: React.FC = () => {
  // react.fc는 post가 함수형 컴포넌트임을 타입스크립트가 인지할수 있도록
  const [boardName, setBoardName] = useState<string>("자유게시판");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      alert("로그인 후 이용해주세요");
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  const adapter = (editorInstance: any) => {
    // 타입스크립트가 ck에디터의 editorInstance 타입을 정확하게 알지 못하기 때문, 타입이 정확하지 않으면 any를 사용
    editorInstance.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return new MyUploadAdapter(loader);
    };
  };

  const GoToMain = () => {
    navigate("/");
  };

  const titlechange = (e: ChangeEvent<HTMLInputElement>) => {
    // 값이 바뀌는 이벤트, <>안에는 변경 이벤트가 실행된 위치 div면 HTMLDivElement
    setTitle(e.target.value);
  };

  const onclick = async (boardName: string) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", boardName);

      const res = await axios.post(
        `http://localhost:8000/api/posts?category=${boardName}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("성공했습니다", res.data);
      navigate("/");
    } catch (error) {
      if (title === "") alert("제목을 입력해주세요");
      if (content === "") alert("내용을 입력해주세요");
      console.error("실패했습니다", error);
    }
  };

  return (
    <div className="post-board">
      <CategoryCompo />
      <div className="test">
        <div className="title-board">
          <select
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            className="board-select"
          >
            <option value="자유게시판">자유게시판</option>
            <option value="공지사항">공지사항</option>
            <option value="축제게시판">축제게시판</option>
            <option value="조원소개">조원소개</option>
          </select>
          <input placeholder="제목" onChange={titlechange} />
        </div>
        <div className="user-name">
          <>작성자 : {user ? user.nick_name : "로딩 중..."}</>
        </div>
        <div className="content-write">
          <div className="ckeditor">
            <CKEditor
              editor={ClassicEditor}
              data=""
              onReady={(editorInstance) => {
                adapter(editorInstance);
              }}
              onChange={(event, editorInstance) => {
                setContent(editorInstance.getData());
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

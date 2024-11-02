import React, { useState } from "react";
//import PathName from "./PathName";
import "../css/PostComp.css";
import { PostCompo, UserInfo, UserInfoCompo } from "../components/MainComp";
import { CategoryCompo } from "../components/CategoryCompo";
import { useEffect } from "react";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useAuth } from "../hooks/auth";

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return new Promise((resolve, reject) => {
      this.loader.file.then((file) => {
        console.log("Loaded file:", file); // 파일 정보 확인
        const data = new FormData();
        data.append("image", file);

        axios
          .post("http://localhost:8000/api/image-upload", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            const imgUrl = res.data;
            console.log(res.data);
            resolve({
              default: imgUrl,
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  }

  abort() {}
}

const Post = () => {
  const [loginUser, setLoginUser] = useState([]);
  const [postCategory, setPostCategory] = useState([]);
  const [boardName, setBoardName] = useState("자유게시판");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      alert("로그인 후 이용해주세요");
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  const adapter = (editorInstance) => {
    editorInstance.plugins.get("FileRepository").createUploadAdapter = (
      loader
    ) => {
      return new MyUploadAdapter(loader);
    };
  };

  const GoToMain = () => {
    navigate("/");
  };

  const titlechange = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };

  const contentchange = (e) => {
    setContent(e.target.value);
    console.log(content);
  };

  const onclick = (boardName) => {
    console.log(`http://localhost:8000/api/posts?category=${boardName}`);

    // FormData 객체 생성
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", boardName);

    axios
      .post(`http://localhost:8000/api/posts?category=${boardName}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("성공했습니다", res.data);
        navigate("/");
      })
      .catch((error) => {
        if (title === "") {
          alert("제목을 입력해주세요");
        }
        if (content === "") {
          alert("내용을 입력해주세요");
        }
        console.error("실패했습니다", error);
      });
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
            <option value={"자유게시판"}>자유게시판</option>
            <option value={"공지사항"}>공지사항</option>
            <option value={"축제게시판"}>축제게시판</option>
          </select>
          <input placeholder="제목" onChange={titlechange}></input>
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
                setEditor(editorInstance);
                adapter(editorInstance, boardName);
              }}
              onChange={(event, editorInstance) => {
                setContent(editorInstance.getData());
              }}
              onUpload={(event, editorInstance) => {
                const imageFile = event.data.file;
                setImage(imageFile); // 이미지 상태에 파일 저장
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

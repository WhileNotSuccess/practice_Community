import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../css/PostComp.css";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import axios from "../lib/axios";
import { UserInfoCompo } from "../components/MainComp";
import ReactHtmlParser from "html-react-parser";
import { useNavigate } from "react-router-dom";
import { CategoryCompo } from "../components/CategoryCompo";

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return new Promise((resolve, reject) => {
      this.loader.file.then((file) => {
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

const PostUpdate = () => {
  const { id } = useParams();
  const [upTitle, setUpTitle] = useState("");
  const [upContent, setUpContent] = useState("");
  const [boardName, setBoardName] = useState("자유게시판");
  const [editor, setEditor] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const adapter = (editorInstance) => {
    editorInstance.plugins.get("FileRepository").createUploadAdapter = (
      loader
    ) => {
      return new MyUploadAdapter(loader);
    };
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/posts/${id}`).then((res) => {
      setUpTitle(res.data.data.title);
      setUpContent(res.data.data.content);
    });
  }, [id]);

  const titlechange = (e) => {
    setUpTitle(e.target.value);
  };

  const GoToMain = () => {
    navigate("/");
  };

  const onclick = (id) => {
    const clean = upContent.replace(/<\/?[^>]+(>|$)/g, "");

    console.log("Current content:", upContent); // 현재 content 확인
    console.log("Cleaned content:", clean);

    axios
      .put(`http://localhost:8000/api/posts/${id}`, {
        title: upTitle,
        content: upContent,
        category: boardName,
      })
      .then((res) => {
        console.log("수정 성공", res.data);

        navigate("/");
      })
      .catch((error) => {
        if (upTitle === "") {
          alert("제목을 입력해주세요");
        }
        if (upContent === "") {
          alert("내용을 입력해주세요");
        }
        console.error("수정 실패", error);
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
          <input
            placeholder="제목"
            onChange={titlechange}
            value={upTitle}
          ></input>
        </div>
        <div className="user-name">
          <>작성자 : {user ? user.nick_name : "로딩 중..."}</>
        </div>
        <div className="content-write">
          <div className="ckeditor">
            <CKEditor
              editor={ClassicEditor}
              data={upContent}
              onReady={(editorInstance) => {
                setEditor(editorInstance);
                adapter(editorInstance, boardName);
              }}
              onChange={(event, editorInstance) => {
                setUpContent(editorInstance.getData());
              }}
              onUpload={(event, editorInstance) => {
                const imageFile = event.data.file;
                setImage(imageFile); // 이미지 상태에 파일 저장
              }}
            />
          </div>
        </div>
        <div className="btns-box">
          <div className="upload-btn" onClick={() => onclick(id)}>
            <>수정</>
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

export default PostUpdate;

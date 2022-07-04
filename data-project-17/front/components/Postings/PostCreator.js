import { useRef, useState, useEffect, useMemo, forwardRef } from "react";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";

import styled from "styled-components";
import Button from "@mui/material/Button";

import * as Api from "../../lib/api";

/* 
  * document 조작의 순서 : 
  * [document 정의 -> react-quill 로드 -> react-quill이 document 조작] (Dynamic Import 이용)
    [react-quill 로드 -> react-quill이 document 조작 -> document 정의] (일반 Import)
    => document is not defined 오류
*/

const PostCreatorBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    width: 500px;
  }
`;

const QuillWrapper = dynamic(
  async () => {
    const { default: ForwardedRefQuill } = await import("react-quill");
    return ({ forwardedRef, ...props }) => <ForwardedRefQuill ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

// * userID 정보는 백엔드에서 처리됨
export default function PostCreator({ setIsOpen, setPostingList }) {
  const [imageId, setImageId] = useState(null);
  const [postingImage, setPostingImage] = useState(null);
  const [article, setArticle] = useState("");
  const [postable, setPostable] = useState(false);
  const quillRef = useRef(null);

  AWS.config.update({
    region: process.env.S3_REGION,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  });

  const imageHandler = () => {
    // 1. 이미지를 저장할 input type-file DOM을 만든다
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accpet", "image/*");
    // 에디터 이미지 버튼을 클릭하면 해당 input이 클릭되고 파일 선택창 나옴
    input.click();

    // 이미지 선택 시
    input.addEventListener("change", async () => {
      console.log("%conChange : 이미지 첨부", "color: #296aba;");

      const file = input.files[0];
      const extension = `.${file.name.split(".")[1]}`;
      const imageUuid = uuidv4();

      setPostingImage(file);
      setImageId(imageUuid);

      // 2. AWS sdk 포함된 함수로 파일 업로드
      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: process.env.S3_BUCKET,
          Key: `test/${imageUuid}${extension}`, // ex: test/uuid.png
          Body: file,
        },
      });

      // 3. AWS S3에 이미지 저장
      const promise = upload.promise();

      const data = await promise
        .then((data) => {
          // S3에 저장된 이미지 URL 가져오기
          setPostingImage(data.Location);
          return data;
        })
        .catch((err) => {
          console.error(err);
        });

      // 4. 현재 에디터 커서 위치 값을 가져와 해당 위치에 이미지 삽입
      const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
      const range = editor.getSelection();
      editor.insertEmbed(range.index, "image", data.Location);
      editor.setSelection(range.index + 1); // 삽입 후 한 칸 옆으로 이동
    });
  };

  // 포스트 제출
  const handleQuillSubmit = async (event) => {
    event.preventDefault();

    // 게시글 포스팅
    try {
      await Api.post("/postings/posting", {
        article,
        file_url: postingImage,
      });

      // 포스팅 후 게시글 리스트 다시 set
      const res = await Api.get("/postingList");
      setPostingList(res.data);
    } catch (err) {
      alert("포스팅 등록에 실패하였습니다.", err);
    }
    // 편집창 닫힘 & 모든 내용 초기화
    // ? 초기화가 나중에 되게는 어떻게? 닫힐 때 지워지는 게 거슬림..
    setIsOpen(false);
    setArticle("");
    setImageId(null);
    setPostingImage(null);
    setPostable(false);
  };

  const formats = ["image"];
  const modules = useMemo(
    () => ({
      toolbar: {
        handlers: {
          image: imageHandler,
        },
        container: [["image"]],
      },
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    }),
    [],
  );

  return (
    <form onSubmit={handleQuillSubmit}>
      <PostCreatorBox>
        <div>
          <QuillWrapper
            forwardedRef={quillRef}
            theme="snow"
            modules={modules}
            formats={formats}
            value={article}
            onChange={(value, delta, source, editor) => {
              const articleLen = editor.getLength();
              const quillArticle = editor.getHTML();
              // const quillArticle = editor.getText();

              setArticle(quillArticle);
              setPostable(articleLen > 2 && imageId !== null);
            }}
            placeholder={"포스팅 내용을 입력하세요"}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          size="small"
          disabled={!postable}
          sx={{ mt: 2, mb: 2, backgroundColor: "#3dad94" }}
        >
          공유하기
        </Button>
      </PostCreatorBox>
    </form>
  );
}

import { useState, useEffect } from "react";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";

import * as Api from "../lib/api";
import PostCreator from "../components/Postings/PostCreator";
import PostCard from "../components/Postings/PostCard";
import Header from "../components/Header";
import Nav from "../components/Nav";

// TODO : 게시글 피드 형태로 보여 주기
// * 모든 게시글 데이터 받아오기 (등록 시간 최근 순)

const PostingPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 200px;
`;

const SlideBox = styled.div`
  overflow: hidden;
  width: 500px;
  max-height: ${(props) => (props.isOpen ? "1000px" : "0")};
  transition: all 0.5s ease-in-out;
`;

export default function Posting() {
  const [isOpen, setIsOpen] = useState(false);
  const [postingList, setPostingList] = useState([]);

  const openPostingForm = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // 포스팅 리스트 불러오기
    Api.get("/postingList")
      .then((res) => {
        setPostingList(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // console.log("postings: ", postingList);

  return (
    <>
      <Header />
			<Nav />
      <PostingPage>
        <IconButton aria-label="posting" onClick={openPostingForm} sx={{ color: "black", mb: 5 }}>
          <AddIcon />
        </IconButton>
        <SlideBox isOpen={isOpen}>
          <PostCreator setIsOpen={setIsOpen} setPostingList={setPostingList} />
        </SlideBox>
        {postingList.map((posting) => (
          <PostCard key={posting.id} posting={posting} setPostingList={setPostingList} />
        ))}
      </PostingPage>
    </>
  );
}

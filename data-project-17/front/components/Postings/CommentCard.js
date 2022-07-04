import styled from "styled-components";
import { Avatar } from "@mui/material";

import * as Api from "../../lib/api";

const TextBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  span {
    font-size: 14px;
    margin-right: 7px;
    cursor: ${(props) => (props.isMine ? "pointer" : "auto")};
  }
`;

export default function CommentCard({ commentInfo, loginUserId, setPostingComments }) {
  const { postings_id, users_id, User, content } = commentInfo;
  const commentId = commentInfo.id;
  const isMine = loginUserId === users_id;

  const handleTextClick = async () => {
    try {
      // 댓글 삭제
      if (window.confirm("해당 댓글을 삭제하시겠습니까?")) {
        await Api.delete(`/postings/${postings_id}/comments/${commentId}`);

        // 삭제 후 댓글 다시 set
        const res = await Api.get(`/postings/${postings_id}/comments`);
        setPostingComments(res.data);
      }
    } catch (err) {
      alert("댓글 삭제에 실패하였습니다.", err);
    }
  };

  return (
    <TextBox isMine={isMine}>
      <Avatar
        alt="User"
        src={User.profile_url || "/img/sample_profile.jpg"}
        sx={{ width: 24, height: 24, marginRight: 1 }}
      />
      <span>
        <b>{User.nickname}</b>
      </span>
      <span onClick={isMine ? handleTextClick : undefined}>{content}</span>
    </TextBox>
  );
}

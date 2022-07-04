// * 나중에 Modal 이용해서 수정이랑 다른 기능 추가하기

import { useState } from "react";

import { IconButton, Popover, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import * as Api from "../../lib/api";

export default function PostingMore({ postingsId, setPostingList, isMine }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleMoreClick = async () => {
    try {
      // 게시글 삭제
      if (window.confirm("해당 포스팅을 삭제하시겠습니까?")) {
        await Api.delete(`/postings/${postingsId}`);

        // 삭제 후 게시글 리스트 다시 set
        const res = await Api.get("/postingList");
        setPostingList(res.data);
      }
    } catch (err) {
      alert("포스팅 삭제에 실패하였습니다.", err);
    }
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={isMine ? handleMoreClick : undefined}
      >
        <MoreHorizIcon />
      </IconButton>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography variant="body2" sx={{ p: 1 }}>
          {isMine ? "게시글 삭제" : "다른 사람의 게시글입니다"}
        </Typography>
      </Popover>
    </>
  );
}

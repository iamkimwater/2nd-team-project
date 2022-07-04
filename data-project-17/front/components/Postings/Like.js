import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import * as Api from "../../lib/api";
import { useUserState } from "../../lib/userContext";

export default function Like({ postingsId, likes, setLikes }) {
  const { user } = useUserState();
  const loginUserId = user.userId;

  // 로그인한 유저가 해당 post에 좋아요를 한 기록이 있는지
  let defaultLiked = false;
  likes.forEach((likesObj) => {
    if (!defaultLiked && likesObj) {
      defaultLiked = Object.values(likesObj).includes(loginUserId);
    }
  });

  const [liked, setLiked] = useState(defaultLiked);

  const handleLikeClick = async () => {
    setLiked((liked) => !liked);
    // 원래 false면 post
    if (!liked) {
      try {
        await Api.post(`/postings/${postingsId}/like`);
        setLikes((current) => [...current, { users_id: loginUserId }]);
      } catch (err) {
        console.error("좋아요에 실패했습니다.", err);
      }
      return;
    }

    // 원래 true면 delete
    try {
      await Api.delete(`/postings/${postingsId}/like`);
      setLikes((current) => {
        return current.filter((el) => !Object.values(el).includes(loginUserId));
      });
    } catch (err) {
      console.error("좋아요 취소에 실패했습니다.", err);
    }
  };

  // 조건 - 좋아요 유저 목록에 있는 id 중에 현재 로그인된 유저 id가 있는가
  return (
    <IconButton aria-label="like" onClick={handleLikeClick} sx={{ ml: -1.2, mr: -0.5 }}>
      {liked ? <FavoriteIcon sx={{ color: "#f95076" }} /> : <FavoriteBorderIcon />}
    </IconButton>
  );
}

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Collapse,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import InsertCommentIcon from "@mui/icons-material/InsertComment";

import CommentCreator from "./CommentCreator";
import PostingComments from "./PostingComments";
import Like from "./Like";
import PostingMore from "./PostingMore";
import { useUserState } from "../../lib/userContext";

// TODO : 피드 레이아웃 완성
// * 유저 데이터 받아오기
// * 사진, 내용, 좋아요, 댓글, 댓글 달기

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostCard({ posting, setPostingList }) {
  const { user } = useUserState();
  const loginUserId = user.userId;
  const postingsId = posting.id;
  const { users_id, User, Likes, article, file_url, Comments } = posting;
  const isMine = loginUserId === users_id;

  // 게시글 본문 문단별로 분리
  const articleArr = article.split("<").map((el) => el.replace("p>", "").replace("/p>", ""));

  const [likes, setLikes] = useState(Likes);
  const [postingComments, setPostingComments] = useState(Comments);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 500, marginBottom: 5 }}>
      <CardHeader
        avatar={
          <Avatar
            alt="User"
            src={User.profile_url || "/img/sample_profile.jpg"}
            sx={{ width: 36, height: 36 }}
          />
        }
        action={
          <PostingMore postingsId={postingsId} setPostingList={setPostingList} isMine={isMine} />
        }
        title={User.nickname}
        titleTypographyProps={{ fontWeight: 600 }}
      />

      <CardMedia
        component="img"
        sx={{ maxHeight: 600, marginBottom: 1 }}
        image={file_url.includes("https://") ? file_url : "/img/sample_profile.jpg"}
        alt="user-image"
      />

      <CardContent>
        <Like postingsId={postingsId} likes={likes} setLikes={setLikes} />
        <Typography variant="button" color="text" mt={1} gutterBottom>
          {likes.length === 0 ? (
            <span>
              가장 먼저 <b>좋아요</b>를 눌러 보세요!
            </span>
          ) : (
            <b>좋아요 {likes.length}개</b>
          )}
        </Typography>
        <Typography variant="body2" color="text" mt={1}>
          <b>{User.nickname}</b>{" "}
          {articleArr.map((arti) => {
            if (!arti.includes("img src=") && arti !== "/") {
              // uuid key 사용
              const artiKey = uuidv4();
              return (
                <span key={artiKey}>
                  {arti
                    .replace("&amp;", "&")
                    .replace("&gt;", ">")
                    .replace("&lt;", "<")
                    .replace("&quot;", '"')}{" "}
                </span>
              );
            }
          })}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          // expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {expanded ? <InsertCommentIcon /> : <CommentOutlinedIcon />}
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {/* 수정 넣기 */}
        <CardContent>
          <PostingComments
            postingComments={postingComments}
            loginUserId={loginUserId}
            setPostingComments={setPostingComments}
          />
        </CardContent>
      </Collapse>
      <CommentCreator
        profile={User.profile_url}
        postingsId={postingsId}
        setPostingList={setPostingList}
        setPostingComments={setPostingComments}
      />
    </Card>
  );
}

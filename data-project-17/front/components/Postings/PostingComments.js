import CommentCard from "./CommentCard";

export default function PostingComments({ postingComments, loginUserId, setPostingComments }) {
  // console.log(Comments);
  return (
    <>
      {postingComments.map((commentInfo) => (
        <CommentCard
          key={commentInfo.id}
          commentInfo={commentInfo}
          loginUserId={loginUserId}
          setPostingComments={setPostingComments}
        />
      ))}
    </>
  );
}

import { useFetchCommentList } from "@/pages/Detail/apis/comment/useFetchCommentList";
import CommentItem from "@/pages/Detail/components/comment/CommentItem";
import { useParams } from "react-router-dom";

const CommentList = () => {
  const threadId = useParams<{ id: string }>().id!;

  const { data } = useFetchCommentList(Number(threadId));

  return (
    <div className="flex flex-col gap-2 pt-4">
      {data.comments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default CommentList;

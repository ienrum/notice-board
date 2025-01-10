import { Button } from "@/components/ui/button";
import { generateDateString } from "@/lib/generateDateString";
import { CommentItem as CommentItemResponse } from "@/pages/Detail/apis/useFetchCommentList";

type CommentItemProps = CommentItemResponse;

const CommentItem = ({
  content,
  updatedAt,
  user,
  isAuthor,
}: CommentItemProps) => {
  return (
    <div className="flex gap-2 justify-between bg-gray-100 p-2">
      <div className="flex flex-col gap-2">
        <p>{content}</p>
        <div className="flex gap-2 text-xs text-gray-500">
          <p>{user.name}</p>
          <p>{generateDateString(updatedAt)}</p>
        </div>
      </div>
      {isAuthor && (
        <div className="flex gap-2 items-center">
          <Button size="sm">수정</Button>
          <Button size="sm" variant="destructive">
            삭제
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentItem;

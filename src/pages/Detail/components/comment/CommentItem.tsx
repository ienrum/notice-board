import { Button } from "@/components/ui/button";
import { generateDateString } from "@/lib/generateDateString";
import { CommentItem as CommentItemResponse } from "@/pages/Detail/apis/useFetchCommentList";
import CommentDeletionButton from "@/pages/Detail/components/comment/CommentDeletionButton";
import CommentUpdateForm from "@/pages/Detail/components/comment/CommentUpdateForm";
import { useState } from "react";

type CommentItemProps = CommentItemResponse;

const CommentItem = ({
  id: commentId,
  content,
  updatedAt,
  user,
  isAuthor,
}: CommentItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditMode = (editMode: boolean) => {
    setIsEditing(editMode);
  };

  return (
    <div className="flex gap-2 justify-between bg-gray-100 p-2">
      <div className="flex flex-col gap-2 w-full">
        {!isEditing && <p>{content}</p>}
        {isEditing && (
          <CommentUpdateForm
            commentId={commentId}
            comment={content}
            onEditModeChange={handleEditMode}
          />
        )}
        <div className="flex gap-2 text-xs text-gray-500">
          <p>{user.name}</p>
          <p>{generateDateString(updatedAt)}</p>
        </div>
      </div>
      {isAuthor && (
        <div className="flex gap-2 items-center">
          {!isEditing && (
            <>
              <Button
                size="sm"
                onClick={() => setIsEditing(true)}
                variant="link"
              >
                수정
              </Button>
              <CommentDeletionButton commentId={commentId} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;

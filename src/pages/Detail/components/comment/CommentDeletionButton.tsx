import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useDeleteComment } from "@/pages/Detail/apis/comment/useDeleteComment";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface CommentDeletionButtonProps {
  commentId: number;
}

const CommentDeletionButton = ({ commentId }: CommentDeletionButtonProps) => {
  const threadId = useParams<{ id: string }>().id!;

  const [open, setOpen] = useState(false);

  const { mutate: deleteComment, isPending } = useDeleteComment({
    threadId: Number(threadId),
    commentId: Number(commentId),
    onSuccess: () => {
      toast({ description: "댓글이 삭제되었습니다." });
      setOpen(false);
    },
  });

  const handleDelete = () => {
    deleteComment();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size="sm" variant="link">
          삭제
        </Button>
      </DialogTrigger>
      <DialogContent>
        정말로 삭제하시겠습니까?
        <Button
          size="sm"
          variant="destructive"
          onClick={handleDelete}
          disabled={isPending}
        >
          확인
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDeletionButton;

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useUpdateComment } from "@/pages/Detail/apis/comment/useUpdateComment";
import { commentFormSchema } from "@/pages/Detail/components/comment/CommentForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";

interface CommentUpdateFormProps {
  commentId: number;
  comment: string;
  onEditModeChange: (editMode: boolean) => void;
}

const CommentUpdateForm = ({
  commentId,
  comment,
  onEditModeChange,
}: CommentUpdateFormProps) => {
  const threadId = useParams<{ id: string }>().id!;

  const commentUpdateForm = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: { comment },
  });

  const handleUpdateSuccess = () => {
    toast({ description: "댓글이 수정되었습니다." });
    onEditModeChange(false);
  };

  const { mutate: updateComment, isPending } = useUpdateComment({
    threadId: Number(threadId),
    commentId,
    onSuccess: () => {
      handleUpdateSuccess();
      commentUpdateForm.reset({ comment });
      onEditModeChange(false);
    },
  });

  const handleUpdateSubmit = (values: z.infer<typeof commentFormSchema>) => {
    updateComment({ content: values.comment });
  };

  const handleCancel = () => {
    commentUpdateForm.reset({ comment });
    onEditModeChange(false);
  };

  return (
    <Form {...commentUpdateForm}>
      <form
        onSubmit={commentUpdateForm.handleSubmit(handleUpdateSubmit)}
        className="flex justify-between items-center"
      >
        <FormField
          control={commentUpdateForm.control}
          name="comment"
          render={({ field }) => (
            <div className="flex gap-2 items-center">
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="w-full" />
            </div>
          )}
        />
        <div className="flex gap-2">
          <Button size="sm" onClick={handleCancel} variant="outline">
            취소
          </Button>
          <Button
            size="sm"
            onClick={commentUpdateForm.handleSubmit(handleUpdateSubmit)}
            disabled={isPending}
          >
            저장
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommentUpdateForm;

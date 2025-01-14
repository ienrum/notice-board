import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useCreateComment } from "@/pages/Detail/apis/useCreateComment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";

export const commentFormSchema = z.object({
  comment: z
    .string()
    .min(3, { message: "3글자 이상 입력해주세요" })
    .max(255, { message: "255글자 이하로 입력해주세요" }),
});

const CommentForm = () => {
  const threadId = useParams<{ id: string }>().id!;

  const { mutate: createComment } = useCreateComment({
    threadId: Number(threadId),
    handleError: (error) => {
      if (error.response?.status === 401) {
        toast({ description: "로그인이 필요합니다", variant: "destructive" });
      }
    },
  });

  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: { comment: "" },
  });

  const handleSubmit = (values: z.infer<typeof commentFormSchema>) => {
    createComment(values.comment, {
      onSuccess: () => {
        form.setValue("comment", "");
        toast({ description: "댓글이 작성되었습니다" });
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex gap-4 items-center"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field, fieldState }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="comment">Comment</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Leave a comment"
                  className="p-4 border border-gray-300 rounded-md resize-none w-full"
                />
              </FormControl>
              <div className="flex justify-between items-center">
                {!fieldState.error && <span className="flex-1" />}
                <FormMessage />
                <Button type="submit" className="justify-center">
                  Submit
                </Button>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default CommentForm;

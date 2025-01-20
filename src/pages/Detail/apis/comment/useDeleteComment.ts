import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteComment = (threadId: number, commentId: number) => {
  return axiosInstance.delete(`/threads/${threadId}/comments/${commentId}`);
};

interface DeleteCommentParams {
  threadId: number;
  commentId: number;
  onSuccess?: () => void;
}

export const useDeleteComment = ({
  threadId,
  commentId,
  onSuccess,
}: DeleteCommentParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteComment(threadId, commentId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["comment", threadId],
      });
      onSuccess?.();
    },
  });
};

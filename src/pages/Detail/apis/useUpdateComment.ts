import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateCommentRequest {
  content: string;
}

const updateComment = (
  threadId: number,
  commentId: number,
  values: UpdateCommentRequest
) => {
  return axiosInstance.put(
    `/threads/${threadId}/comments/${commentId}`,
    values
  );
};

interface UpdateCommentParams {
  threadId: number;
  commentId: number;
  onSuccess?: () => void;
}

export const useUpdateComment = ({
  threadId,
  commentId,
  onSuccess,
}: UpdateCommentParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: UpdateCommentRequest) =>
      updateComment(threadId, commentId, values),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["comment", threadId],
      });
      onSuccess?.();
    },
  });
};

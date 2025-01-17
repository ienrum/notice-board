import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const createComment = async (threadId: number, content: string) => {
  const response = await axiosInstance.post(`/threads/${threadId}/comments`, {
    content,
  });
  return response.data;
};

interface CreateCommentParams {
  threadId: number;
  onError: (error: AxiosError) => void;
  onSuccess?: () => void;
}

export const useCreateComment = ({
  threadId,
  onError,
  onSuccess,
}: CreateCommentParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createComment(threadId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", threadId] });
      onSuccess?.();
    },
    onError,
  });
};

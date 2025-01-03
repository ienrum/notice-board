import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteThread = (threadId: number) => {
  return axiosInstance.delete(`/threads/${threadId}`);
};

export const useDeleteThread = (threadId: number, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteThread(threadId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["thread", threadId],
      });
      onSuccess?.();
    },
  });
};

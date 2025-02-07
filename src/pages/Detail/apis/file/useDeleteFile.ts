import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteFile = async (threadId: number, ids: number[]) => {
  return axiosInstance.post(`file/${threadId}/delete/`, { ids });
};

interface UseDeleteFileParams {
  threadId: number;
  onSuccess?: () => void;
}

export const useDeleteFile = ({ threadId, onSuccess }: UseDeleteFileParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: number[]) => deleteFile(threadId, ids),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["file", threadId],
      });
      onSuccess?.();
    },
  });
};

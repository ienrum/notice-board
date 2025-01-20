import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteFile = async (ids: number[]) => {
  return axiosInstance.post("file/delete", { ids });
};

interface UseDeleteFileParams {
  threadId: number;
  onSuccess?: () => void;
}

export const useDeleteFile = ({ threadId, onSuccess }: UseDeleteFileParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["file", threadId],
      });
      onSuccess?.();
    },
  });
};

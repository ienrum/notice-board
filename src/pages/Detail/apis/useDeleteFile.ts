import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteFile = async (ids: number[]) => {
  return axiosInstance.post("file/delete", { ids });
};

interface UseDeleteFileParams {
  threadId: number;
  onSucess?: () => void;
}

export const useDeleteFile = ({ threadId, onSucess }: UseDeleteFileParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["file", threadId],
      });
      onSucess?.();
    },
  });
};

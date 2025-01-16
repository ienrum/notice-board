import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const uploadFiles = async (threadId: number, files: FormData) => {
  return axiosInstance.post(`file/upload/${threadId}`, files, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

interface UseUploadFilesParams {
  threadId: number;
  onSuccess?: () => void;
}

export const useUploadFiles = ({
  threadId,
  onSuccess,
}: UseUploadFilesParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (files: FormData) => uploadFiles(threadId, files),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["file", threadId],
      });
      onSuccess?.();
    },
  });
};

import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

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
  onError?: (error: AxiosError) => void;
}

export const useUploadFiles = ({
  threadId,
  onSuccess,
  onError,
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
    onError: (error: AxiosError) => {
      onError?.(error);
    },
  });
};

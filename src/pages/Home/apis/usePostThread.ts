import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface PostThreadRequest {
  title: string;
  content: string;
}

interface PostThreadResponse {
  message: string;
}

const postThread = async (data: PostThreadRequest) => {
  const response = await axiosInstance.post<PostThreadResponse>(
    "threads",
    data
  );

  return response.data;
};

interface UsePostThreadProps {
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
}

export const usePostThread = ({
  onSuccess: handleSuccess,
  onError: handleError,
}: UsePostThreadProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postThread,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["thread"] });
      handleSuccess?.();
    },
    onError: handleError,
  });
};

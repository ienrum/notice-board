import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PostThreadRequest {
  title: string;
  content: string;
  author: string;
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
  onError?: () => void;
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
    onError: () => {
      handleError?.();
    },
  });
};

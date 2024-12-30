import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PostThreadRequest {
  title: string;
  content: string;
  author: string;
}

const postThread = async (data: PostThreadRequest) => {
  const response = await axiosInstance.post("threads", data);

  return response.data;
};

export const usePostThread = (handleSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postThread,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["threads"] });
      handleSuccess();
    },
  });
};

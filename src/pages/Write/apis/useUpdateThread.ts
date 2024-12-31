import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface RequestUpdateThread {
  title: string;
  content: string;
  author: string;
}

const updateThread = async (threadId: number, data: RequestUpdateThread) => {
  return axiosInstance.put(`/threads/${threadId}`, data);
};

export const useUpdateThread = (threadId: number, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RequestUpdateThread) => updateThread(threadId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["threads"],
      });
      onSuccess?.();
    },
  });
};

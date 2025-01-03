import { axiosInstance } from "@/lib/axiosInstance";
import { useSuspenseQuery } from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
}

interface ThreadResponse {
  id: number;
  title: string;
  content: string;
  author: User;
  isMyThread: boolean;
}

const fetchThread = async (id: number): Promise<ThreadResponse> => {
  const { data } = await axiosInstance.get(`/threads/${id}`);
  return data;
};

export const useFetchThread = (id: number) => {
  return useSuspenseQuery({
    queryKey: ["thread", id],
    queryFn: () => fetchThread(id),
    select: (data) => data,
  });
};

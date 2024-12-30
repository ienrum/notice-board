import { axiosInstance } from "@/lib/axiosInstance";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Thread {
  id: number;
  title: string;
  content: string;
  author: string;
}

const fetchThread = async (id: number): Promise<Thread> => {
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

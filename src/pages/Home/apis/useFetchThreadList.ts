import { axiosInstance } from "@/lib/axiosInstance";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface ThreadItem {
  id: number;
  title: string;
  author: string;
}

interface ThreadListResponse {
  data: ThreadItem[];
  totalPage: number;
}

const fetchThreadList = (page: number) => {
  return axiosInstance.get<ThreadListResponse>("threads", { params: { page } });
};

export const useFetchThreadList = (page: number) => {
  return useQuery({
    queryKey: ["thread", page],
    queryFn: () => fetchThreadList(page),
    placeholderData: keepPreviousData,
    select: (data) => data.data,
  });
};

import { axiosInstance, BaseResponseDto } from "@/lib/axiosInstance";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface ThreadItem {
  id: number;
  title: string;
  content: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
  };
}

interface ThreadListResponse {
  threads: ThreadItem[];
  totalPage: number;
}

const fetchThreadList = (page: number) => {
  return axiosInstance.get<BaseResponseDto<ThreadListResponse>>("threads", {
    params: { page },
  });
};

export const useFetchThreadList = (page: number) => {
  return useQuery({
    queryKey: ["thread", page],
    queryFn: () => fetchThreadList(page),
    placeholderData: keepPreviousData,
    select: (data) => data.data.data,
  });
};

import { axiosInstance, BaseResponseDto } from "@/lib/axiosInstance";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Author {
  id: number;
  name: string;
}

interface ThreadResponse {
  author: Author;
  id: number;
  title: string;
  content: string;
  viewCount: number;
  isAuthor: boolean;
  createdAt: string;
  updatedAt: string;
}

const fetchThread = async (id: number) => {
  const { data } = await axiosInstance.get<BaseResponseDto<ThreadResponse>>(
    `/threads/${id}`
  );
  return data;
};

export const useFetchThread = (id: number) => {
  return useSuspenseQuery({
    queryKey: ["thread", id],
    queryFn: () => fetchThread(id),
    select: (data) => data.data,
  });
};

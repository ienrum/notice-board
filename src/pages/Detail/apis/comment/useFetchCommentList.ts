import { axiosInstance, BaseResponseDto } from "@/lib/axiosInstance";
import { useSuspenseQuery } from "@tanstack/react-query";

export interface CommentItem {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    name: string;
  };
  isAuthor: boolean;
  threadId: number;
}

interface CommentListResponse {
  comments: CommentItem[];
}

const fetchCommentList = (threadId: number) => {
  return axiosInstance.get<BaseResponseDto<CommentListResponse>>(
    `/threads/${threadId}/comments`
  );
};

export const useFetchCommentList = (threadId: number) => {
  return useSuspenseQuery({
    queryKey: ["comment", threadId],
    queryFn: () => fetchCommentList(threadId),
    select: (data) => data.data.data,
  });
};

import { axiosInstance } from "@/lib/axiosInstance";
import { useSuspenseQuery } from "@tanstack/react-query";

interface FileResponse {
  files: {
    id: number;
    name: string;
    originalName: string;
    size: number;
    type: string;
    url: string;
  }[];
  isAuthor: boolean;
}

const getFiles = async (threadId: number) => {
  return axiosInstance.get<FileResponse>(`file/${threadId}`);
};

export const useFetchFiles = (threadId: number) => {
  return useSuspenseQuery({
    queryKey: ["file", threadId],
    queryFn: () => getFiles(threadId),
    select: (data) => data.data,
  });
};

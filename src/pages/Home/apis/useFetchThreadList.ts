import { axiosInstance } from "@/lib/axiosInstance";
import { useSuspenseQuery } from "@tanstack/react-query";

interface ThreadItem {
  id: number;
  title: string;
  author: string;
}

const fetchThreadList = () => {
  return axiosInstance.get<ThreadItem[]>("threads");
};

export const useFetchThreadList = () => {
  return useSuspenseQuery({
    queryKey: ["threads"],
    queryFn: fetchThreadList,
    select: (data) => data.data,
  });
};

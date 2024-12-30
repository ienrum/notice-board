import { axiosInstance } from "@/lib/axiosInstance";
import { useEffect, useState } from "react";

interface ThreadItem {
  id: number;
  title: string;
  author: string;
}

const fetchBoardList = () => {
  return axiosInstance.get<ThreadItem[]>("threads");
};

export const useFetchBoardList = () => {
  const [data, setData] = useState<ThreadItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetchBoardList();
      setIsLoading(false);

      setData(response.data);
    };

    fetchData();
  }, []);

  return { data, isLoading };
};

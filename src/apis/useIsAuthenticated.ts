import { axiosInstance, BaseResponseDto } from "@/lib/axiosInstance";
import { useSuspenseQuery } from "@tanstack/react-query";

interface ResponseMe {
  isAuthorized: boolean;
}

export const useIsAuthorized = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["me"],
    queryFn: () => axiosInstance.get<BaseResponseDto<ResponseMe>>("/auth/me"),
    select: (data) => data.data.data,
  });

  return data?.isAuthorized;
};

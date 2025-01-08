import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";

interface RequestSignin {
  name: string;
  password: string;
}

export const useSignin = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: (data: RequestSignin) => {
      return axiosInstance.post("/auth/signin", data);
    },
    onSuccess,
  });
};

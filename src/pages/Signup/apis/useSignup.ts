import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";

interface RequestSignup {
  name: string;
  password: string;
}

export const useSignup = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: (data: RequestSignup) => {
      return axiosInstance.post("/auth/signup", data);
    },
    onSuccess,
  });
};

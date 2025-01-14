import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface RequestSignup {
  name: string;
  password: string;
}

interface UseSignupParams {
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
}

export const useSignup = ({ onSuccess, onError }: UseSignupParams) => {
  return useMutation({
    mutationFn: (data: RequestSignup) => {
      return axiosInstance.post("/auth/signup", data);
    },
    onSuccess,
    onError,
  });
};

import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface RequestSignin {
  name: string;
  password: string;
}

interface UseSignInParams {
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
}

export const useSignin = ({ onSuccess, onError }: UseSignInParams) => {
  return useMutation({
    mutationFn: (data: RequestSignin) => {
      return axiosInstance.post("/auth/signin", data);
    },
    onSuccess,
    onError,
  });
};

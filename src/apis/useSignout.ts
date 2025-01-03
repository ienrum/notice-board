import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const signout = async () => {
  return axiosInstance.post("/auth/signout");
};

export const useSignout = () => {
  return useMutation({
    mutationFn: signout,
    onSuccess: () => {
      location.reload();
    },
  });
};

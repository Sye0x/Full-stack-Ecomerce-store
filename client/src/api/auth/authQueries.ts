import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRegister, useLogin } from "./authApi";
import type { authParams } from "../../types/types";

export const useRegisterQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: authParams) => useRegister(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
};

export const useLoginQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: authParams) => useLogin(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
};

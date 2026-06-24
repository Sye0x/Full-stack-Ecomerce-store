import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRegister, useLogin, useLogOut } from "./authApi";
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

export const useLogoutQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => useLogOut(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
};

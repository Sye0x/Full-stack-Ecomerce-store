import type { authParams } from "../../types/types";
import { axiosInstance } from "../api";

export const useRegister = async (params: authParams) => {
  const { data } = await axiosInstance.post("/api/auth/register", params);
  return data;
};

export const useLogin = async (params: authParams) => {
  const { data } = await axiosInstance.post("/api/auth/login", params);
  return data;
};

export const useLogOut = async () => {
  const { data } = await axiosInstance.post("/api/auth/logout");
  return data;
};

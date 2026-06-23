import type { categoryParams } from "../../types/types";
import { axiosInstance } from "../api";

export const useGetCategory = async () => {
  const { data } = await axiosInstance.get("/api/category");
  return data;
};

export const useAddCategory = async (params: categoryParams) => {
  const data = await axiosInstance.post("/api/category", params);

  return data;
};

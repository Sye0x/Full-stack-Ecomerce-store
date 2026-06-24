import type { categoryParams } from "../../types/types";
import { axiosInstance } from "../api";

export const useGetCategory = async () => {
  const { data } = await axiosInstance.get("/api/category");
  return data;
};

export const useAddCategory = async (params: categoryParams) => {
  console.log("HHHee");
  const data = await axiosInstance.post("/api/category", {
    data: params,
  });

  return data;
};

export const useEditCategory = async (params: categoryParams) => {
  const data = await axiosInstance.put("/api/category", params);

  return data;
};

export const useDeleteCategory = async (params: categoryParams) => {
  const response = await axiosInstance.delete("/api/category", {
    data: params,
  });

  return response.data;
};

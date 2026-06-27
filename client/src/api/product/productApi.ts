import { axiosInstance } from "../api";
import type { productParams } from "../../types/types";

export const useAddProduct = async (formData: FormData) => {
  const response = await axiosInstance.post("/api/product", formData);
  return response.data;
};

export const useGetProducts = async () => {
  const response = await axiosInstance.get("/api/product");
  return response.data;
};

export const useDeleteProduct = async (params: productParams) => {
  const response = await axiosInstance.delete("/api/product", {
    data: params,
  });

  return response.data;
};

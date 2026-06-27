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

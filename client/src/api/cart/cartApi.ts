import { axiosInstance } from "../api";
import type { cartParams } from "../../types/types";

export const useAddItem = async (params: cartParams) => {
  const response = await axiosInstance.post("/api/cart", params);
  return response.data;
};

export const useSubItem = async (params: cartParams) => {
  const response = await axiosInstance.post("/api/cart/decrease", params);
  return response.data;
};

export const useGetItems = async (params: cartParams) => {
  const response = await axiosInstance.get("/api/cart", params);
  return response.data;
};

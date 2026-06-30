import type { orderParams } from "../../types/types";
import { axiosInstance } from "../api";

export const useCreateOrder = async (params: orderParams) => {
  const data = await axiosInstance.post("/api/order", {
    data: params,
  });

  return data;
};

export const useGetUserOrder = async (params: orderParams) => {
  const response = await axiosInstance.get("/api/order/user", {
    params: {
      userId: params.userId,
    },
  });

  return response.data;
};

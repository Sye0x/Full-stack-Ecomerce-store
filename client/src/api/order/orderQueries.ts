import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  useCreateOrder,
  useGetUserOrder,
  useGetOrder,
  useSetOrderStatus,
} from "./orderApi";
import type { orderParams } from "../../types/types";

export const useCreateOrderQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: orderParams) => useCreateOrder(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["UserOrders"] });
    },
  });
};

export const useGetUserOrderQuery = (params: orderParams) => {
  return useQuery({
    queryKey: ["UserOrders"],
    queryFn: () => useGetUserOrder(params),
  });
};

export const useSetStatusQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: orderParams) => useSetOrderStatus(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Orders"] });
    },
  });
};

export const useGetOrderQuery = () => {
  return useQuery({
    queryKey: ["Orders"],
    queryFn: () => useGetOrder(),
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCreateOrder, useGetUserOrder } from "./orderApi";
import type { orderParams } from "../../types/types";

import { useQuery } from "@tanstack/react-query";

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

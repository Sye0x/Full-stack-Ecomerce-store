import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAddItem, useGetItems, useSubItem } from "./cartApi";
import type { cartParams } from "../../types/types";

import { useQuery } from "@tanstack/react-query";

export const useAddCartQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: cartParams) => useAddItem(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useSubCartQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: cartParams) => useSubItem(params),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useGetCartsQuery = (params: cartParams) => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => useGetItems(params),
  });
};

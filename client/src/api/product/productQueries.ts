import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAddProduct, useDeleteProduct, useGetProducts } from "./productApi";
import type { productParams } from "../../types/types";

import { useQuery } from "@tanstack/react-query";

export const useAddProductQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => useAddProduct(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useGetProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: useGetProducts,
  });
};

export const useDeleteProductQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: productParams) => useDeleteProduct(params),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

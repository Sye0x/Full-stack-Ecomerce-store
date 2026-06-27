import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAddProduct, useGetProducts } from "./productApi";
import type { productParams } from "../../types/types";

import { useQuery } from "@tanstack/react-query";

export const useAddProductQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => useAddProduct(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};

export const useGetProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: useGetProducts,
  });
};

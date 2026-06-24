import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useGetCategory,
  useAddCategory,
  useDeleteCategory,
  useEditCategory,
} from "./categoryApi";
import type { categoryParams } from "../../types/types";

import { useQuery } from "@tanstack/react-query";

export const useGetCategoryQuery = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => useGetCategory(),
  });
};

export const useAddCategoryQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: categoryParams) => useAddCategory(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

export const useEditCategoryQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: categoryParams) => useEditCategory(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

export const useDeleteCategoryQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: categoryParams) => useDeleteCategory(params),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

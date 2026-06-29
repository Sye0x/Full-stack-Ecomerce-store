import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldGroup } from "../../ui/field";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useState } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

import { useGetCategoryQuery } from "../../../api/category/categoryQueries";
import { useEditProductQuery } from "../../../api/product/productQueries";
import type { productParams } from "../../../types/types";

const productSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name is too long")
    .regex(
      /^[A-Za-z0-9\s\-&()]+$/,
      "Name can only contain letters, numbers, spaces, -, &, and ().",
    ),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters.")
    .max(500, "Description is too long."),

  price: z
    .string()
    .regex(
      /^(0|[1-9]\d*)(\.\d{1,2})?$/,
      "Enter a valid price (e.g. 100 or 99.99).",
    ),

  stockQuantity: z
    .string()
    .regex(
      /^(0|[1-9]\d*)$/,
      "Stock quantity must be a non-negative whole number.",
    ),

  categoryId: z.string().min(1, "Please select a category."),

  status: z.string(),
});

type ProductSchema = z.infer<typeof productSchema>;
type EditProductFormProps = {
  params: productParams;
};

export default function EditProductForm({ params }: EditProductFormProps) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const { data: Category } = useGetCategoryQuery();
  const editProductFn = useEditProductQuery();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: params.description,
      price: params.price,
      stockQuantity: params.stockQuantity,
      categoryId: params.categoryId,
      status: params.status,
    },
  });

  const onSubmit: SubmitHandler<ProductSchema> = async (data) => {
    const formData = new FormData();
    formData.append("id", params.id);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stockQuantity", data.stockQuantity);
    formData.append("categoryId", data.categoryId);
    formData.append("status", data.status);
    console.log("HEELLO");
    if (image) {
      formData.append("image", image);
    }

    await editProductFn.mutateAsync(formData);
    reset();
    setImage(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer hover:scale-110">
        <Pencil
          size={20}
          onClick={() => {
            reset({
              name: params.name,
              description: params.description,
              price: params.price,
              stockQuantity: params.stockQuantity.toString(),
              categoryId: params.categoryId,
              status: params.status,
            });
          }}
        />
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>

          <FieldGroup className="mt-5 space-y-4">
            <Field>
              <Label htmlFor="name">Name</Label>

              <Input
                id="name"
                placeholder="Product Name"
                {...register("name")}
              />

              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>

            <Field>
              <Label htmlFor="description">Description</Label>

              <Textarea
                id="description"
                placeholder="Enter product description..."
                {...register("description")}
              />

              {errors.description && (
                <FieldError>{errors.description.message}</FieldError>
              )}
            </Field>

            <Field>
              <Label htmlFor="price">Price</Label>

              <Input
                id="price"
                placeholder="Product Price"
                {...register("price")}
              />

              {errors.price && <FieldError>{errors.price.message}</FieldError>}
            </Field>

            <Field>
              <Label htmlFor="stockQuantity">Stock Quantity</Label>

              <Input
                id="stockQuantity"
                placeholder="Stock Quantity"
                {...register("stockQuantity")}
              />

              {errors.stockQuantity && (
                <FieldError>{errors.stockQuantity.message}</FieldError>
              )}
            </Field>

            <Field>
              <Label htmlFor="Category">Category</Label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Categories" />
                    </SelectTrigger>

                    <SelectContent>
                      {Category?.map((item: any) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.categoryId && (
                <FieldError>{errors.categoryId.message}</FieldError>
              )}
            </Field>

            <Field>
              <Label htmlFor="stockQuantity">Upload Image</Label>

              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.length) {
                    setImage(e.target.files[0]);
                  }
                }}
              />
            </Field>

            <Field>
              <Label htmlFor="Status">Status</Label>

              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem key="ACTIVE" value="ACTIVE">
                        ACTIVE
                      </SelectItem>
                      <SelectItem key="OUT_OF_STOCK" value="OUT_OF_STOCK">
                        OUT_OF_STOCK
                      </SelectItem>
                      <SelectItem key="INACTIVE" value="INACTIVE">
                        INACTIVE
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.status && (
                <FieldError>{errors.status.message}</FieldError>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={editProductFn.isPending}>
              {editProductFn.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

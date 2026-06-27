import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Controller } from "react-hook-form";

import { Field, FieldError, FieldGroup } from "../../components/ui/field";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import { useGetCategoryQuery } from "../../api/category/categoryQueries";
import { useAddProductQuery } from "../../api/product/productQueries";

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
});

type ProductSchema = z.infer<typeof productSchema>;

export default function AddProductForm() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const { data: Category } = useGetCategoryQuery();
  const addProductFn = useAddProductQuery();
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
      description: "",
      price: "",
      stockQuantity: "",
      categoryId: "",
    },
  });

  const onSubmit: SubmitHandler<ProductSchema> = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stockQuantity", data.stockQuantity);
    formData.append("categoryId", data.categoryId);
    console.log("HEELLO");
    if (image) {
      formData.append("image", image);
    }

    await addProductFn.mutateAsync(formData);
    reset();
    setImage(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Plus
          size={30}
          onClick={() =>
            reset({
              name: "",
              description: "",
            })
          }
        />
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            <DialogDescription>
              Create a product to put in store.
            </DialogDescription>
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
          </FieldGroup>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={addProductFn.isPending}>
              {addProductFn.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import Sidebar from "../../components/admin/sidebar";
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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import { useGetCategoryQuery } from "../../api/category/categoryQueries";

export default function ProductManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-16 justify-between items-center gap-4 border-b bg-sidebar px-6">
        <div className="flex items-center gap-5">
          <Sidebar />
          <h1 className="text-2xl font-bold">Products</h1>
        </div>
        <AddProductForm />
      </header>
      <main className="p-6">{/* Your page content */}</main>
    </div>
  );
}

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

  imageUrl: z.string().url("Please enter a valid image URL."),
});

type ProductSchema = z.infer<typeof productSchema>;

function AddProductForm() {
  const [open, setOpen] = useState(false);
  const [categoryExistError, setCategoryExistError] = useState("");
  const { data: Category, isLoading } = useGetCategoryQuery();
  const {
    register,
    handleSubmit,
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
      imageUrl: "",
    },
  });

  const onSubmit: SubmitHandler<ProductSchema> = async (data) => {
    try {
    } catch (err) {
      console.error(err);
    }
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
            <p className="text-[0.8rem] text-red-500">{categoryExistError}</p>
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
              <Select>
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Catefories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {isLoading ? (
                      <SelectItem value="">Loading</SelectItem>
                    ) : (
                      Category.map((item: any) => (
                        <SelectItem value={item.id}>{item.name}</SelectItem>
                      ))
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit">
              {/* {AddCategoryFn.isPending ? "Saving..." : "Save"} */}
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

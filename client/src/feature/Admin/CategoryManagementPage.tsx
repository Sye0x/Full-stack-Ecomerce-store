import { useState } from "react";
import Sidebar from "../../components/admin/sidebar";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";

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

import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

import {
  useGetCategoryQuery,
  useAddCategoryQuery,
  useDeleteCategoryQuery,
  useEditCategoryQuery,
} from "../../api/category/categoryQueries";

import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name is too long")
    .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),

  description: z.string().min(1, "Description is required"),
});

type CategorySchema = z.infer<typeof categorySchema>;

export default function CategoryManagementPage() {
  const [open, setOpen] = useState(false);
  const [categoryExistError, setCategoryExistError] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [categoryEditExistError, setCategoryEditExistError] = useState("");

  const { data: Category, isLoading } = useGetCategoryQuery();

  const AddCategoryFn = useAddCategoryQuery();
  const EditCategoryFn = useEditCategoryQuery();
  const DeleteCategoryFn = useDeleteCategoryQuery();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<CategorySchema> = async (data) => {
    try {
      console.log("HEE");

      const response = await AddCategoryFn.mutateAsync(data);

      if (response.data.message === "Category already exists.") {
        setCategoryExistError(response.data.message);
      } else {
        reset();
        setOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onEditSubmit = (id: string) => async (data: CategorySchema) => {
    try {
      const response = await EditCategoryFn.mutateAsync({ id, ...data });
      if (response.data.message === "Category already exists.") {
        setCategoryEditExistError(response.data.message);
      } else {
        reset();
        setEditOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeCategory = async (id: string) => {
    try {
      console.log(id);
      await DeleteCategoryFn.mutateAsync({ id });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-16 items-center gap-4 border-b bg-sidebar px-6">
        <Sidebar />
        <h1 className="text-2xl font-bold">Categories</h1>
      </header>

      <main className="p-6">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <h2 className="text-xl font-semibold">Category Management</h2>

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
                    <DialogTitle>Add Category</DialogTitle>

                    <DialogDescription>
                      Create a category that can group similar products
                      together.
                    </DialogDescription>
                    <p className="text-[0.8rem] text-red-500">
                      {categoryExistError}
                    </p>
                  </DialogHeader>

                  <FieldGroup className="mt-5 space-y-4">
                    <Field>
                      <Label htmlFor="name">Name</Label>

                      <Input
                        id="name"
                        placeholder="Category Name"
                        {...register("name")}
                      />

                      {errors.name && (
                        <FieldError>{errors.name.message}</FieldError>
                      )}
                    </Field>

                    <Field>
                      <Label htmlFor="description">Description</Label>

                      <Textarea
                        id="description"
                        placeholder="Enter category description..."
                        {...register("description")}
                      />

                      {errors.description && (
                        <FieldError>{errors.description.message}</FieldError>
                      )}
                    </Field>
                  </FieldGroup>

                  <DialogFooter className="mt-6">
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </DialogClose>

                    <Button type="submit" disabled={AddCategoryFn.isPending}>
                      {AddCategoryFn.isPending ? "Saving..." : "Save"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>

          <CardContent className="p-0">
            <div className="m-5 overflow-hidden rounded-lg border">
              <table className="w-full border-collapse">
                <thead className="bg-muted">
                  <tr>
                    <th className="w-20 px-6 py-4 text-left">#</th>

                    <th className="px-6 py-4 text-left">Name</th>

                    <th className="px-6 py-4 text-left">Description</th>

                    <th className="w-40 px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-8 text-center text-muted-foreground"
                      >
                        Loading categories...
                      </td>
                    </tr>
                  ) : !Category || Category.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-8 text-center text-muted-foreground"
                      >
                        No categories found.
                      </td>
                    </tr>
                  ) : (
                    Category.map((item: any, index: number) => (
                      <tr key={item.id} className="border-t hover:bg-muted/40">
                        <td className="px-6 py-4">{index + 1}</td>

                        <td className="px-6 py-4 font-medium">{item.name}</td>

                        <td className="px-6 py-4 text-muted-foreground">
                          {item.description}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                              <DialogTrigger asChild>
                                <Pencil
                                  className="text-green-500 cursor-pointer"
                                  size={20}
                                  onClick={() => {
                                    reset({
                                      name: item.name,
                                      description: item.description,
                                    });

                                    setEditOpen(true);
                                  }}
                                />
                              </DialogTrigger>

                              <DialogContent>
                                <form
                                  onSubmit={handleSubmit(onEditSubmit(item.id))}
                                >
                                  <DialogHeader>
                                    <DialogTitle>Edit Category</DialogTitle>
                                    <p className="text-[0.8rem] text-red-500">
                                      {categoryEditExistError}
                                    </p>
                                  </DialogHeader>

                                  <FieldGroup className="mt-5 space-y-4">
                                    <Field>
                                      <Label htmlFor="name">Name</Label>

                                      <Input
                                        id="name"
                                        placeholder="Category Name"
                                        {...register("name")}
                                      />

                                      {errors.name && (
                                        <FieldError>
                                          {errors.name.message}
                                        </FieldError>
                                      )}
                                    </Field>

                                    <Field>
                                      <Label htmlFor="description">
                                        Description
                                      </Label>

                                      <Textarea
                                        id="description"
                                        placeholder="Enter category description..."
                                        {...register("description")}
                                      />

                                      {errors.description && (
                                        <FieldError>
                                          {errors.description.message}
                                        </FieldError>
                                      )}
                                    </Field>
                                  </FieldGroup>

                                  <DialogFooter className="mt-6">
                                    <DialogClose asChild>
                                      <Button type="button" variant="outline">
                                        Cancel
                                      </Button>
                                    </DialogClose>

                                    <Button
                                      type="submit"
                                      disabled={AddCategoryFn.isPending}
                                    >
                                      {AddCategoryFn.isPending
                                        ? "Saving..."
                                        : "Save"}
                                    </Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>

                            <button
                              onClick={() => removeCategory(item.id)}
                              className="cursor-pointer"
                            >
                              <Trash2 className="text-red-500" size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

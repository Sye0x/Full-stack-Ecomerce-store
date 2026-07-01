import Sidebar from "../../components/admin/sidebar";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "../../components/ui/card";

import {
  useDeleteProductQuery,
  useGetProductsQuery,
  useGetUserProductsQuery,
} from "../../api/product/productQueries";

import AddProductForm from "../../components/admin/product/AddProductForm";
import EditProductForm from "../../components/admin/product/editProductFomr";
import { Search } from "lucide-react";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import { useGetCategoryQuery } from "../../api/category/categoryQueries";

export default function ProductManagementPage() {
  const deleteProductFn = useDeleteProductQuery();
  const [categoryId, setCategoryId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoryQuery();
  const deleteProduct = async (id: string) => {
    await deleteProductFn.mutateAsync({ id });
  };
  const { data: products, isLoading } = useGetUserProductsQuery({
    categoryId,
    searchTerm,
    role: "ADMIN",
  });
  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-16 justify-between items-center gap-4 border-b bg-sidebar px-6">
        <div className="flex items-center gap-5">
          <Sidebar />
          <h1 className="text-2xl font-bold">Products</h1>
        </div>
        <AddProductForm />
      </header>
      <main className="p-8">
        <div className="mx-auto mb-10 flex max-w-5xl flex-col gap-4 md:flex-row">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="h-14 rounded-full border-2 pl-12 pr-6 shadow-sm"
            />
          </div>

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="h-14 rounded-full  bg-background px-6"
          >
            <option value="">All Categories</option>
            {categoriesLoading ? (
              <option>Loading...</option>
            ) : (
              categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            )}
          </select>
        </div>
        {isLoading ? (
          <div className="flex h-[60vh] items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products?.map((product: any) => (
              <Card
                key={product.id}
                className="p-0 group overflow-hidden rounded-2xl  bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={`http://localhost:3000${product.imageUrl}`}
                    alt={product.name}
                    className="h-full w-full object-cover  "
                  />

                  <span
                    className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow-md ${
                      product.status === "ACTIVE"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>

                <CardHeader className="space-y-1 pb-2">
                  <CardTitle className="line-clamp-1 text-xl">
                    {product.name}
                  </CardTitle>

                  <p className="text-sm text-muted-foreground">
                    {product.category?.name ?? "No Category"}
                  </p>
                </CardHeader>

                <CardContent className="space-y-5">
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Price
                      </p>

                      <h2 className="text-3xl font-bold text-primary">
                        ${product.price}
                      </h2>
                    </div>

                    <div className="text-right">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Stock
                      </p>

                      <p
                        className={`text-lg font-bold ${
                          product.stockQuantity > 10
                            ? "text-green-600"
                            : product.stockQuantity > 0
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {product.stockQuantity}
                      </p>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="gap-3">
                  <div className="flex-1">
                    <EditProductForm params={product} />
                  </div>

                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && products?.length === 0 && (
          <div className="flex h-[60vh] flex-col items-center justify-center rounded-xl border border-dashed">
            <h2 className="text-2xl font-semibold">No Products Found</h2>

            <p className="mt-2 text-muted-foreground">
              Click "Add Product" to create your first product.
            </p>

            <div className="mt-6">
              <AddProductForm />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

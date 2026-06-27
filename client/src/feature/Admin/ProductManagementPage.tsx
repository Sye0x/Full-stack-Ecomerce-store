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
} from "../../api/product/productQueries";

import AddProductForm from "../../components/admin/AddProductForm";

export default function ProductManagementPage() {
  const { data: products, isLoading } = useGetProductsQuery();
  const deleteProductFn = useDeleteProductQuery();

  const deleteProduct = async (id: string) => {
    await deleteProductFn.mutateAsync({ id });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-16 justify-between items-center gap-4 border-b bg-sidebar px-6">
        <div className="flex items-center gap-5">
          <Sidebar />
          <h1 className="text-2xl font-bold">Products</h1>
        </div>
        <AddProductForm />
      </header>
      <main className="p-6 grid grid-cols-3 gap-10">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          products?.map((product: any) => (
            <Card
              key={product.id}
              className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="h-60 w-full bg-muted">
                <img
                  src={`http://localhost:3000${product.imageUrl}`}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{product.name}</CardTitle>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      product.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">
                  {product.category?.name ?? "No Category"}
                </p>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>

                    <p className="text-xl font-bold text-primary">
                      ${product.price}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Stock</p>

                    <p
                      className={`font-semibold ${
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
                <Button className="flex-1" variant="outline">
                  Edit
                </Button>

                <Button
                  className="flex-1"
                  variant="destructive"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </main>
    </div>
  );
}

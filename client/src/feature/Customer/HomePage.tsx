import { ShoppingBasket } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { useGetProductsQuery } from "../../api/product/productQueries";
import { useAddCartQuery, useGetCartsQuery } from "../../api/cart/cartQueries";
import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import { Link, useNavigate } from "@tanstack/react-router";

export default function HomePage() {
  const navigation = useNavigate();

  const { data: products, isLoading } = useGetProductsQuery();
  const addCartItemFn = useAddCartQuery();
  const userId = useSelector((state: RootState) => state.auth.id);
  const { data: cartItem } = useGetCartsQuery({ userId });

  const addItemToCart = (productId: string, price: string) => {
    if (userId) {
      addCartItemFn.mutateAsync({ userId, productId, price });
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <header className=" border-b bg-sidebar backdrop-blur">
        <div className=" flex h-16  items-center justify-between px-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Store</h1>

          <div className="flex items-center gap-4">
            <div className="relative">
              <ShoppingBasket
                size={28}
                onClick={() => navigation({ to: "/customer/customerCart" })}
              />

              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartItem?.length ?? 0}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="mx-auto mb-10 max-w-3xl bg-sidebar rounded-full">
          <Input
            className="h-14 rounded-full border-2 px-6 text-2lg shadow-sm"
            placeholder="🔍 Search products..."
          />
        </div>
        <div>
          {isLoading ? (
            <div className="flex h-[60vh] items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products
                ?.filter((product: any) => product.status !== "INACTIVE")
                .map((product: any) => (
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
                      <Button
                        onClick={() => addItemToCart(product.id, product.price)}
                        disabled={product.stockQuantity === 0}
                      >
                        Add to Cart
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
                New product will be add soon.
              </p>

              <div className="mt-6"></div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

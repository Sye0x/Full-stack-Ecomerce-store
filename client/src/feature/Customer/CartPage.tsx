import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import {
  useAddCartQuery,
  useGetCartsQuery,
  useSubCartQuery,
} from "../../api/cart/cartQueries";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../../components/ui/button";

export default function CartPage() {
  const navigation = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.id);

  const { data: cartItem, isLoading } = useGetCartsQuery({ userId });

  const addCartItemFn = useAddCartQuery();
  const subCartItemFn = useSubCartQuery();

  const addItemToCart = (productId: string, price: string) => {
    if (userId) {
      addCartItemFn.mutateAsync({ userId, productId, price });
    }
  };

  const subItemToCart = (productId: string, price: string) => {
    if (userId) {
      subCartItemFn.mutateAsync({ userId, productId, price });
    }
  };

  const totalItems =
    cartItem?.reduce((sum: number, item: any) => sum + item.quantity, 0) ?? 0;

  const totalPrice =
    cartItem
      ?.reduce(
        (sum: number, item: any) =>
          sum + Number(item.unitPrice) * item.quantity,
        0,
      )
      .toFixed(2) ?? "0.00";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-sidebar">
        <div className=" flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 sm:gap-5">
            <ArrowLeft
              size={28}
              className="cursor-pointer hover:text-foreground/60"
              onClick={() => navigation({ to: "/customer/customerHome" })}
            />

            <h1 className="text-2xl font-bold sm:text-3xl">Cart</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-8 p-4 sm:p-6 lg:flex-row lg:p-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-5">
          {isLoading ? (
            <div className="flex h-[60vh] items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : cartItem?.length === 0 ? (
            <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
              <h2 className="text-2xl font-semibold">Your cart is empty</h2>

              <p className="mt-2 text-muted-foreground">
                Add some products to get started.
              </p>
            </div>
          ) : (
            cartItem.map((item: any) => (
              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-2xl border bg-card p-4 shadow-sm transition hover:shadow-md sm:flex-row"
              >
                <img
                  src={`http://localhost:3000${item.product.imageUrl}`}
                  alt={item.product.name}
                  className="mx-auto h-40 w-40 rounded-xl object-cover sm:mx-0 sm:h-36 sm:w-36"
                />

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold sm:text-2xl">
                      {item.product.name}
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.product.description}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    {/* Unit Price */}
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Unit Price
                      </p>

                      <p className="text-lg font-semibold">
                        ${Number(item.unitPrice).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-3">
                      <Button
                        onClick={() =>
                          subItemToCart(item.product.id, item.product.price)
                        }
                      >
                        −
                      </Button>

                      <span className="w-8 text-center text-lg font-semibold">
                        {item.quantity}
                      </span>

                      <Button
                        onClick={() =>
                          addItemToCart(item.product.id, item.product.price)
                        }
                      >
                        +
                      </Button>
                    </div>

                    {/* Total */}
                    <div className="text-left lg:text-right">
                      <p className="text-sm text-muted-foreground">Total</p>

                      <p className="text-2xl font-bold text-primary">
                        ${(Number(item.unitPrice) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        {!isLoading && cartItem?.length > 0 && (
          <div className="w-full rounded-2xl border bg-card p-6 shadow-md lg:sticky lg:top-8 lg:w-80">
            <h2 className="text-xl font-bold">Order Summary</h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span>Items</span>

                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>

                <span>${totalPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>

                <span>Free</span>
              </div>

              <hr />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>

                <span>${totalPrice}</span>
              </div>

              <button
                onClick={() =>
                  navigation({
                    to: "/customer/customerCheckout",
                  })
                }
                className="mt-6 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

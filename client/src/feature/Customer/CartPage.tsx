import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import {
  useAddCartQuery,
  useGetCartsQuery,
  useSubCartQuery,
} from "../../api/cart/cartQueries";
import { useGetProductsQuery } from "../../api/product/productQueries";

export default function CartPage() {
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
  return (
    <div className="bg-background min-h-screen">
      <header className=" border-b bg-sidebar backdrop-blur">
        <div className=" flex h-16  items-center justify-between px-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Carts</h1>
        </div>
      </header>
      <main className="mx-auto flex max-w-7xl gap-8 p-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-5">
          {isLoading ? (
            <div className="flex h-[60vh] items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : cartItem?.length === 0 ? (
            <div className="rounded-xl border bg-card p-10 text-center shadow-sm">
              <h2 className="text-2xl font-semibold">Your cart is empty</h2>
              <p className="mt-2 text-muted-foreground">
                Add some products to get started.
              </p>
            </div>
          ) : (
            cartItem.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center gap-6 rounded-2xl border bg-card p-5 shadow-sm transition-all hover:shadow-md"
              >
                <img
                  src={`http://localhost:3000${item.product.imageUrl}`}
                  alt={item.product.name}
                  className="h-36 w-36 rounded-xl object-cover"
                />

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {item.product.name}
                    </h2>

                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {item.product.description}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Unit Price
                      </p>

                      <p className="text-lg font-semibold">
                        ${Number(item.unitPrice).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 rounded-lg border px-4 py-2">
                      <button
                        className="text-xl font-bold"
                        onClick={() =>
                          subItemToCart(item.product.id, item.product.price)
                        }
                      >
                        −
                      </button>

                      <span className="text-lg font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        className="text-xl font-bold"
                        onClick={() =>
                          addItemToCart(item.product.id, item.product.price)
                        }
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
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
          <div className="sticky top-8 h-fit w-80 rounded-2xl border bg-card p-6 shadow-md">
            <h2 className="text-xl font-bold">Order Summary</h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span>Items</span>

                <button>
                  {cartItem.reduce(
                    (sum: number, item: any) => sum + item.quantity,
                    0,
                  )}
                </button>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>

                <span>
                  $
                  {cartItem
                    .reduce(
                      (sum: number, item: any) =>
                        sum + Number(item.unitPrice) * item.quantity,
                      0,
                    )
                    .toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>

                <span>Free</span>
              </div>

              <hr />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>

                <span>
                  $
                  {cartItem
                    .reduce(
                      (sum: number, item: any) =>
                        sum + Number(item.unitPrice) * item.quantity,
                      0,
                    )
                    .toFixed(2)}
                </span>
              </div>

              <button className="mt-6 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition hover:opacity-90">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

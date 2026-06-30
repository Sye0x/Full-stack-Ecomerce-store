import { ArrowLeft } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

import { useGetCartsQuery } from "../../api/cart/cartQueries";
import type { RootState } from "../../state/store";
import { useState } from "react";
import { useCreateOrderQuery } from "../../api/order/orderQueries";
import OrderSuccessAlert from "../../components/alerts/OrderCreated";

export default function CheckOutPage() {
  const navigation = useNavigate();

  const [shippingAddress, setShippingAddress] = useState("");
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const userId = useSelector((state: RootState) => state.auth.id);

  const { data: cartItem = [], isLoading } = useGetCartsQuery({
    userId,
  });

  const createOrderFn = useCreateOrderQuery();

  const shippingFee = "10";
  const discount = "5";

  const stotal = cartItem.reduce((total: number, item: any) => {
    return total + Number(item.product.price) * Number(item.quantity);
  }, 0);
  const subtotal = String(stotal);

  const total = stotal + Number(shippingFee) - Number(discount);
  const totalAmount = String(total);
  const createOrder = async () => {
    try {
      setCreatingOrder(true);
      await createOrderFn.mutateAsync({
        userId,
        subtotal,
        discount,
        shippingFee,
        totalAmount,
        shippingAddress,
      });

      setShowSuccess(true);

      setTimeout(() => {
        navigation({ to: "/customer/customerHome" });
      }, 2000);
    } catch (err) {
      setCreatingOrder(false);

      console.error(err);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex h-16 items-center gap-4 border-b bg-sidebar px-6">
        <ArrowLeft
          size={28}
          className="cursor-pointer transition hover:text-muted-foreground"
          onClick={() =>
            navigation({
              to: "/customer/customerCart",
            })
          }
        />

        <h1 className="text-2xl font-bold">Checkout</h1>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <Label>Shipping Address</Label>

                <Textarea
                  rows={5}
                  placeholder="House #, Street, City..."
                  onChange={(e) => setShippingAddress(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="sticky top-6 h-fit">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
              ) : cartItem.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  Your cart is empty.
                </div>
              ) : (
                <>
                  {cartItem.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border-b pb-4"
                    >
                      <img
                        src={`http://localhost:3000${item.product.imageUrl}`}
                        alt={item.product.name}
                        className="h-20 w-20 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product.name}</h3>

                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          $ {item.product.price}
                        </p>
                      </div>

                      <div className="font-bold">
                        $
                        {(Number(item.product.price) * item.quantity).toFixed(
                          2,
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="space-y-3 border-t pt-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${stotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${Number(shippingFee).toFixed(2)}</span>
                    </div>

                    <div className={`flex justify-between `}>
                      <span>Discount</span>
                      <span
                        className={` ${Number(discount) > 0 ? `text-green-400` : `text-foreground`}`}
                      >
                        ${Number(discount).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between border-t pt-4 text-xl font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    className="h-12 w-full text-lg"
                    onClick={() => createOrder()}
                    disabled={creatingOrder}
                  >
                    Place Order
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      {showSuccess && (
        <div className="fixed right-6 bottom-5 z-50">
          <OrderSuccessAlert />
        </div>
      )}
    </div>
  );
}

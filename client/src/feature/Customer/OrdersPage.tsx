import { ArrowLeft } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

import { useGetUserOrderQuery } from "../../api/order/orderQueries";
import type { RootState } from "../../state/store";

export default function OrdersPage() {
  const navigation = useNavigate();

  const userId = useSelector((state: RootState) => state.auth.id);

  const { data, isLoading, isError } = useGetUserOrderQuery({
    userId,
  });

  const orders = data?.orders ?? [];

  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-16 items-center gap-4 border-b bg-sidebar px-6">
        <ArrowLeft
          size={30}
          onClick={() => {
            navigation({ to: "/customer/customerHome" });
          }}
          className="hover:text-foreground/50 cursor-pointer"
        />

        <h1 className="text-2xl font-bold">My Orders</h1>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 p-6">
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        )}

        {isError && (
          <div className="text-center text-red-500">Failed to load orders.</div>
        )}

        {!isLoading && orders.length === 0 && (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              You haven't placed any orders yet.
            </CardContent>
          </Card>
        )}

        {orders.map((order: any) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <CardTitle>Order #{order.id.slice(0, 8)}</CardTitle>

                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Badge>{order.status}</Badge>
                  <Badge variant="secondary">{order.paymentStatus}</Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {order.items.map((item: any) => (
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

                    <p className="text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>

                    <p className="text-muted-foreground">
                      Unit Price: ${item.unitPrice}
                    </p>
                  </div>

                  <div className="font-bold">
                    ${(Number(item.unitPrice) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}

              <div className="space-y-2  pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${order.shippingFee}</span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${order.discount}</span>
                </div>

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${order.totalAmount}</span>
                </div>

                <div className="pt-2 text-sm text-muted-foreground">
                  <strong>Shipping Address:</strong> {order.shippingAddress}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}

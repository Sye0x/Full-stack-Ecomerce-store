import { createFileRoute } from "@tanstack/react-router";
import OrdersPage from "../../feature/Customer/OrdersPage";

export const Route = createFileRoute("/customer/customerOrder")({
  component: () => <OrdersPage />,
});

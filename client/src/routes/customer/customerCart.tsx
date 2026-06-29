import { createFileRoute } from "@tanstack/react-router";
import CartPage from "../../feature/Customer/CartPage";

export const Route = createFileRoute("/customer/customerCart")({
  component: () => <CartPage />,
});

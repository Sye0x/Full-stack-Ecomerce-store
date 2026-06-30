import { createFileRoute } from "@tanstack/react-router";
import CheckOutPage from "../../feature/Customer/CheckOutPage";
export const Route = createFileRoute("/customer/customerCheckout")({
  component: () => <CheckOutPage />,
});

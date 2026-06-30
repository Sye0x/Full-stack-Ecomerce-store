import { createFileRoute } from "@tanstack/react-router";
import OrderManagementPage from "../../feature/Admin/OrderMangementPage";

export const Route = createFileRoute("/admin/adminOrders")({
  component: () => <OrderManagementPage />,
});

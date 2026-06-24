import { createFileRoute } from "@tanstack/react-router";
import ProductManagementPage from "../../feature/Admin/ProductManagementPage";

export const Route = createFileRoute("/admin/adminProduct")({
  component: ProductManagementPage,
});

import { createFileRoute } from "@tanstack/react-router";
import CategoryManagementPage from "../../feature/Admin/CategoryManagementPage";
export const Route = createFileRoute("/admin/adminCategories")({
  component: () => <CategoryManagementPage />,
});

import { createFileRoute, redirect } from "@tanstack/react-router";
import HomePage from "../../feature/Admin/HomePage";

export const Route = createFileRoute("/admin/adminHome")({
  component: HomePage,
});

import { createFileRoute } from "@tanstack/react-router";
import HomePage from "../../feature/Customer/HomePage";

export const Route = createFileRoute("/customer/customerHome")({
  component: () => <HomePage />,
});

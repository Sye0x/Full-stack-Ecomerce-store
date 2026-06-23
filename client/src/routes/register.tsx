import { createFileRoute } from "@tanstack/react-router";
import RegisterPage from "../feature/RegisterPage";
export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

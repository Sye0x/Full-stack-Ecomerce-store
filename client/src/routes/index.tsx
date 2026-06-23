import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "../feature/LoginPage";

export const Route = createFileRoute("/")({
  component: () => <LoginPage />,
});

import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { store } from "../../state/store";

function AdminLayout() {
  return <Outlet />;
}

export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    const { role } = store.getState().auth;

    if (role !== "ADMIN") {
      throw redirect({
        to: "/",
      });
    }
  },

  component: AdminLayout,
});

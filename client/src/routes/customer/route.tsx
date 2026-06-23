import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { store } from "../../state/store";

function CustomerLayout() {
  return <Outlet />;
}

export const Route = createFileRoute("/customer")({
  beforeLoad: () => {
    const { role } = store.getState().auth;

    if (role !== "CUSTOMER") {
      throw redirect({
        to: "/login",
      });
    }
  },

  component: CustomerLayout,
});

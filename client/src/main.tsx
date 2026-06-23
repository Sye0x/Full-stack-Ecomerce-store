import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRouter,
  createHashHistory,
} from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import "./index.css";

const hashHistory = createHashHistory();

const router = createRouter({
  routeTree,
  history: hashHistory,
});

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}

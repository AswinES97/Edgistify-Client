import { createBrowserRouter } from "react-router-dom";
import { Wrapper } from "./pages/wrapper";

import { lazy } from "react";
import HomePage from "./pages/homepage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Wrapper,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/signup",
        Component: lazy(() => import("./pages/signup")),
      },
      {
        path: "/signin",
        Component: lazy(() => import("./pages/signin")),
      },
      {
        path: "/cart",
        Component: lazy(() => import("./pages/cart")),
      },
    ],
  },
]);

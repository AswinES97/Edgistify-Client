import { createBrowserRouter, redirect } from "react-router-dom";
import Wrapper from "./pages/wrapper";
import { getToken } from "./components/auth";

import { lazy } from "react";
import HomePage from "./pages/homepage";
import { toast } from "react-toastify";

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
        loader: () => {
          if (getToken()) {
            return redirect("/");
          }
          return null;
        },
      },
      {
        path: "/signin",
        Component: lazy(() => import("./pages/signin")),
        loader: () => {
          if (getToken()) {
            return redirect("/");
          }
          return null;
        },
      },
      {
        path: "/cart",
        Component: lazy(() => import("./pages/cart")),
        loader: () => {
          if (!getToken()) {
            toast.error("Should be logged in to view cart");
            return redirect("/signin");
          }
          return null;
        },
      },
    ],
  },
]);

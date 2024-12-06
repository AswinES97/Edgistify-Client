import { createBrowserRouter } from "react-router-dom";
import { SignupForm } from "./pages/signup";
import { SigninForm } from "./pages/signin";
import HomePage from "./pages/homepage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/signup",
    Component: SignupForm,
  },
  {
    path: "/signin",
    Component: SigninForm,
  },
]);

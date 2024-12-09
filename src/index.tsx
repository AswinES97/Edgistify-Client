import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// @material-tailwind/react
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/auth";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      <ToastContainer position="bottom-right" autoClose={1500} />
    </ThemeProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import app from "./firebase";
import App from "./App";
import "./index.css";
import { AppStateProvider } from "./providers/appStateProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppStateProvider>
      <RouterProvider router={router} />
    </AppStateProvider>
  </React.StrictMode>
);

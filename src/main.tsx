import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "@/pages/Home";
import DetailPage from "@/pages/Detail";
import WritePage from "@/pages/Write";
import Signup from "@/pages/Signup";
import Signin from "@/pages/Signin";
import { Toaster } from "@/components/ui/toaster";
import ErrorPage from "@/components/ui/ErrorPage";
import TanstackQueryProvider from "@/providers/TanstackQuery";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/thread/:id",
        element: <DetailPage />,
      },
      {
        path: "write/:id?",
        element: <WritePage />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackQueryProvider>
      <RouterProvider router={router} />
    </TanstackQueryProvider>
    <Toaster />
  </StrictMode>
);

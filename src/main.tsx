import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import TanstackQueryProvider from "@/providers/tanstackQuery";
import HomePage from "@/pages/Home";
import DetailPage from "@/pages/Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/thread/:id",
    element: <DetailPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackQueryProvider>
      <RouterProvider router={router} />
    </TanstackQueryProvider>
  </StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import ContextProvider from "../customHooks/useExhibit";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </React.StrictMode>
    ,
  </QueryClientProvider>
);

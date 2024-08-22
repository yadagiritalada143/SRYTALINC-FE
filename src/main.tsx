import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./index.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <App />
      <ToastContainer />
    </MantineProvider>
  </StrictMode>
);

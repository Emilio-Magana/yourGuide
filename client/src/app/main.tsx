import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import Layout from "./layout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Layout />
  </StrictMode>
);

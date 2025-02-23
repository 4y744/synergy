import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app";

import "./globals.css";
import "@synergy/i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

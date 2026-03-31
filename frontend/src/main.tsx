import React from "react";
import ReactDOM from "react-dom/client";
import { HomePage } from "./components";
import "./styles/index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./components/providers/ToastProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <HomePage />
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>
);

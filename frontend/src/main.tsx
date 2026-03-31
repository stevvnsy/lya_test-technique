import React from "react";
import ReactDOM from "react-dom/client";
import { HomePage } from "./components";
import "./styles/index.css";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ThemeProvider>
        <HomePage />
      </ThemeProvider>
    </ThemeProvider>
  </React.StrictMode>
);

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Change "backend" to "localhost" for local development outside Docker
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});

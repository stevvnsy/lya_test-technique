import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Change "backend" to "localhost" for local development outside Docker
      "/api": {
        target: "http://backend:8080",
        changeOrigin: true,
      },
    },
  },
});

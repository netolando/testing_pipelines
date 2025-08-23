import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config: dev server on 5173, preview on 4173
export default defineConfig({
  plugins: [react({ fastRefresh: false })],
  server: {
    host: "0.0.0.0",
    port: 5173, // dev mode
  },
  preview: {
    host: "0.0.0.0",
    port: 4173, // preview mode
  },
});

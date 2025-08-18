import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",   // bind all interfaces for Codesandbox
    port: 5173,
    allowedHosts: true // allow *.csb.app
  }
});

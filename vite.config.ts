import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0", // Bind the server to all network interfaces
    port: 5173,      // Specify the port to match Docker's exposed port
  },
  preview: {
    host: "0.0.0.0", // Ensure the preview server is accessible externally
    port: 5173,      // Same port for consistency
  },
});

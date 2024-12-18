import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".", // Root directory where index.html is located
  build: {
    outDir: "dist", // Build output folder
    rollupOptions: {
      input: "index.html", // Specify entry point
    },
  },
  server: {
    port: 3000,
  },
});
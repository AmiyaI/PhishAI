import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".", // Ensure this points to your root folder containing index.html
  build: {
    outDir: "dist", // Ensure this matches your Amplify build settings
    rollupOptions: {
      input: "./index.html", // Ensure index.html is correctly referenced
    },
  },
});
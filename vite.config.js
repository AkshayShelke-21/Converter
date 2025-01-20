import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Example: Split vendor libraries into their own chunk
          if (id.includes("node_modules")) {
            return "vendor"; // All node_modules will be in the vendor chunk
          }
        },
      },
    },
    chunkSizeWarningLimit: 2000, // Adjust the chunk size limit if needed
  },
});

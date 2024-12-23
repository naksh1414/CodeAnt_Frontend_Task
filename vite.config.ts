import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Needed for docker
    port: 5173, // Vite's default port
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
});

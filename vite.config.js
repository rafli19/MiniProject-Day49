import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/v1": {
        target: "https://api.rafvoid.my.id",
        changeOrigin: true,
      },
      "/storage": {
        target: "https://api.rafvoid.my.id",
        changeOrigin: true,
      },
    },
  },
});

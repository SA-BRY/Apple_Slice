import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  build: {
    outDir: "dist-react",
    emptyOutDir: true,
    rollupOptions: {
      external: ["electron"], // THIS IS KEY - tell Rollup not to bundle electron
    },
  },
  server: {
    port: 5123,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    loader: "tsx",
    include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
});

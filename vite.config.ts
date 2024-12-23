import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/features/todo/components"),
      "@hooks": path.resolve(__dirname, "src/features/todo/hooks"),
      "@types": path.resolve(__dirname, "src/types"),
      "@services": path.resolve(__dirname, "src/features/todo/model"),
      "@ui": path.resolve(__dirname, "src/features/todo/ui"),
      "@shared": path.resolve(__dirname, "src/shared"),
    },
  },
});

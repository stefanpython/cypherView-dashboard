import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://stefanpython.github.io/cypherView-dashboard",
  plugins: [react()],
});

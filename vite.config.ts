import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

const sourcemap = {
  development: "inline",
  staging: "inline",
  production: true,
};

export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  build: {
    sourcemap: sourcemap[mode],
  },
}));

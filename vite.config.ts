import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      sass: { additionalData: `@import "./src/scss/main.scss";` },
    },
  },
  alias: {
    "~": path.resolve(__dirname, "src"),
  },
});

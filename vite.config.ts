import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      sass: { additionalData: `@import "./src/scss/main.scss";` },
    },
  },
});

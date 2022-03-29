import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import ViteFonts from "vite-plugin-fonts";

const sourcemap: any = {
  development: "inline",
  staging: "inline",
  production: true,
};

export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    ViteFonts({
      google: {
        families: [
          "Material+Icons",
          {
            name: "Noto+Sans+JP",
            styles: "wght@400;500;700",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  build: {
    sourcemap: sourcemap[mode],
  },
}));

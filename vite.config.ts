import path from "path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
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
    rollupOptions: {
      // https://rollupjs.org/guide/en/#outputmanualchunks
      output: {
        manualChunks: {
          main: ["./src/ui/main.ts"],
          // nav: [
          //   "./src/pages/course/_id/edit.vue",
          //   "./src/pages/course/_id/index.vue",
          //   "./src/pages/credit/index.vue",
          //   "./src/pages/credit/_id.vue",
          //   "./src/pages/add/csv.vue",
          //   "./src/pages/add/index.vue",
          //   "./src/pages/add/manual.vue",
          //   "./src/pages/add/search.vue",
          //   "./src/pages/add/twins.vue",
          //   "./src/pages/feedback.vue",
          //   "./src/pages/news.vue",
          //   "./src/pages/view-settings.vue",
          // ],
          // other: [
          //   "./src/pages/404.vue",
          //   "./src/pages/login.vue",
          //   "./src/pages/import.vue",
          // ],
        },
      },
    },
  },
}));

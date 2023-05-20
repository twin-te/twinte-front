import path from "path";
import { sentryRollupPlugin } from "@sentry/rollup-plugin";
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
          nav: [
            "./src/ui/pages/course/_id/edit.vue",
            "./src/ui/pages/course/_id/index.vue",
            "./src/ui/pages/credit/index.vue",
            "./src/ui/pages/credit/_id.vue",
            "./src/ui/pages/add/csv.vue",
            "./src/ui/pages/add/index.vue",
            "./src/ui/pages/add/manual.vue",
            "./src/ui/pages/add/search.vue",
            "./src/ui/pages/add/twins.vue",
            "./src/ui/pages/feedback.vue",
            "./src/ui/pages/news.vue",
            "./src/ui/pages/settings.vue",
          ],
          other: [
            "./src/ui/pages/404.vue",
            "./src/ui/pages/login.vue",
            "./src/ui/pages/import.vue",
          ],
        },
      },
      plugins: [
        (() =>
          process.env.SOURCE_MAP === "1"
            ? sentryRollupPlugin({
                org: "twin-te",
                project: "front",
                include: path.resolve(__dirname, "dist"),
                authToken: process.env.SENTRY_AUTH_TOKEN,
              })
            : null)(),
      ],
    },
  },
}));

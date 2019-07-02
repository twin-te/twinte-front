import NuxtConfiguration from "@nuxt/config";

const config: NuxtConfiguration = {
  srcDir: "src/",
  head: {
    titleTemplate: "Twinte",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ],
    link: [
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
      }
    ]
  },
  modules: []
};

export default config;

import NuxtConfiguration from "@nuxt/config";

const config: NuxtConfiguration = {
  mode: "universal",
  srcDir: "src/",
  head: {
    titleTemplate: "Twinte",
    htmlAttrs: {
      lang: "ja"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "noindex" }
    ],
    link: [
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
      }
    ]
  },
  css: ["@/assets/css/main.scss"],
  modules: ["@nuxtjs/pwa"],
  workbox: {
    dev: true
  },
  meta: {
    mobileAppIOS: true,
    appleStatusBarStyle: false,
    lang: "ja",
    nativeUI: true
  },
  manifest: {
    name: "Twin:te",
    short_name: "Twin:te",
    lang: "ja",
    start_url: "/",
    display: "standalone"
  }
};

export default config;

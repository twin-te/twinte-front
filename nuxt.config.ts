import { Configuration } from "@nuxt/types";

const nuxtConfig: Configuration = {
  buildModules: ["@nuxt/typescript-build"],
  mode: "universal",
  srcDir: "src/",
  server: {
    port: 5000,
    host: "localhost"
  },
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
  loading: {
    color: "teal",
    height: "5px"
  },
  css: ["@/assets/css/main.scss"],
  modules: [
    "@nuxtjs/pwa",
    "@nuxtjs/proxy",
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-133970007-1"
      }
    ]
    /**"@nuxtjs/localtunnel"*/
  ],
  proxy: {
    "/api": "http://dev.api.twinte.net"
  },
  plugins: ["~/plugins/vue-notifications"],
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

module.exports = nuxtConfig;

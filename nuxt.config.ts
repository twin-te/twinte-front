import NuxtConfiguration from "@nuxt/config";

const config: NuxtConfiguration = {
  head: {
    titleTemplate: "Twinte",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ]
  },
  modules: ["@nuxtjs/vuetify"]
};

export default config;

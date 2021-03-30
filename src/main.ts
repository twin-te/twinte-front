import { createApp } from "vue";

import App from "./App.vue";
import { router } from "./route";
import { store, StateKey } from "./store";
import "./scss/main.scss";
import VueClickAway from "vue3-click-away";
import { createHead } from "@vueuse/head";

const head = createHead();

createApp(App)
  .use(router)
  .use(store, StateKey)
  .use(VueClickAway)
  .use(head)
  .mount("#app");

import { createApp } from "vue";

import App from "./App.vue";
import { router } from "./route";
import { store } from "./store";
import "./scss/main.scss";
import VueClickAway from "vue3-click-away";

createApp(App).use(router).use(store).use(VueClickAway).mount("#app");

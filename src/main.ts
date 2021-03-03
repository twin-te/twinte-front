import { createApp } from "vue";

import App from "./App.vue";
import { router } from "./route";
import { store, StateKey } from "./store";
import "./scss/main.scss";

createApp(App).use(router).use(store, StateKey).mount("#app");

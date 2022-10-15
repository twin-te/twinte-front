import { createGtm } from "@gtm-support/vue-gtm";
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";
import { createHead } from "@vueuse/head";
import { createApp } from "vue";
import VueClickAway from "vue3-click-away";
import App from "./App.vue";
import { router } from "./route";
import "./styles/_index.scss";

Sentry.init({
  dsn: String(import.meta.env.VITE_APP_SENTRY_URL ?? ""),
  release: "twinte-front@" + import.meta.env.npm_package_version,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

const head = createHead();
const app = createApp(App);

app.config.errorHandler = (err, _vm, _info) => {
  Sentry.captureException(err); // 手動でSentryに送信
};

app
  .use(router)
  .use(VueClickAway)
  .use(head)
  .use(
    createGtm({
      id: "GTM-PHSLD8B",
      vueRouter: router,
      enabled: import.meta.env.PROD,
      debug: import.meta.env.DEV,
    })
  )
  .mount("#app");

window.addEventListener("error", (event) => {
  Sentry.captureException(event); // 手動でSentryに送信
});
window.addEventListener("unhandledrejection", (event) => {
  Sentry.captureException(event); // 手動でSentryに送信
});

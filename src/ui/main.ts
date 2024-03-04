import "core-js/features/array/at";
import { createGtm } from "@gtm-support/vue-gtm";
import { BrowserTracing } from "@sentry/tracing";
import * as Sentry from "@sentry/vue";
import { createHead } from "@vueuse/head";
import { createApp } from "vue";
import VueClickAway from "vue3-click-away";
import App from "./App.vue";
import { router } from "./route";
import "./styles/_index.scss";

const app = createApp(App);

Sentry.init({
  app,
  dsn: String(import.meta.env.VITE_APP_SENTRY_URL ?? ""),
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["app.twinte.net"],
    }),
    new Sentry.Replay({
      maskAllText: false,
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.01,
  replaysOnErrorSampleRate: 1.0,
  logErrors: true,
});

const head = createHead();

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

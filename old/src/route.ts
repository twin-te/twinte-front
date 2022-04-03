import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import App from "./pages/index.vue";
import Login from "./pages/login.vue";
import Add from "./pages/add/index.vue";
import Search from "./pages/add/search.vue";
import CSV from "./pages/add/csv.vue";
import Manual from "./pages/add/manual.vue";
import Details from "./pages/course/_id/index.vue";
import Edit from "./pages/course/_id/edit.vue";
import Twins from "./pages/add/twins.vue";
import ViewSettings from "./pages/view-settings.vue";
import Feedback from "./pages/feedback.vue";
import News from "./pages/news.vue";
import Credit from "./pages/credit/index.vue";
import Courses from "./pages/credit/_id.vue";
import Error404 from "./pages/404.vue";

const history = createWebHistory();

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes: RouteRecordRaw[] = [
  { path: "/", component: App },
  {
    path: "/login",
    component: Login,
    meta: { hasSidebar: false, hasWelcomeModal: false },
  },
  { path: "/view-settings", component: ViewSettings },
  { path: "/add", component: Add },
  { path: "/add/search", component: Search },
  { path: "/add/csv", component: CSV },
  { path: "/add/manual", component: Manual },
  { path: "/add/twins", component: Twins },
  { path: "/course/:id/edit", component: Edit },
  { path: "/course/:id", component: Details },
  { path: "/Feedback", component: Feedback },
  { path: "/news", component: News },
  { path: "/credit", component: Credit },
  { path: "/credit/:id", component: Courses },
  { path: "/:pathMatch(.*)*", component: Error404 },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export const router = createRouter({
  history,
  routes,
});

export default router;

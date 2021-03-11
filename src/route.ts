import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import App from "./pages/index.vue";
import Add from "./pages/add/index.vue";
import CSV from "./pages/add/csv.vue";
import Manual from "./pages/add/manual.vue";
import Details from "./pages/course/_course_id/index.vue";
import Edit from "./pages/course/_course_id/edit.vue";
import Preview from "./pages/preview.vue";

const history = createWebHistory();

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes: RouteRecordRaw[] = [
  { path: "/", component: App },
  { path: "/add", component: Add },
  { path: "/add/csv", component: CSV },
  { path: "/add/manual", component: Manual },
  { path: "/course/:course_id/edit", component: Edit },
  { path: "/course/:course_id", component: Details },
  { path: "/preview", component: Preview },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export const router = createRouter({
  history,
  routes,
});

export default router;

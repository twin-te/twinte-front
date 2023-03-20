import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// ページを追加するときはダイナミックインポートする
// 必要に応じてvite.config.tsにも設定を追加する
// ホームはダイナミックインポートしない
import App from "./pages/index.vue";
const Error404 = () => import("./pages/404.vue");
const CSV = () => import("./pages/add/csv.vue");
const Add = () => import("./pages/add/index.vue");
const Manual = () => import("./pages/add/manual.vue");
const Search = () => import("./pages/add/search.vue");
const Twins = () => import("./pages/add/twins.vue");
const Edit = () => import("./pages/course/_id/edit.vue");
const Details = () => import("./pages/course/_id/index.vue");
const Courses = () => import("./pages/credit/_id.vue");
const Credit = () => import("./pages/credit/index.vue");
const Feedback = () => import("./pages/feedback.vue");
const Import = () => import("./pages/import.vue");
const Login = () => import("./pages/login.vue");
const News = () => import("./pages/news.vue");
const Settings = () => import("./pages/settings.vue");

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
  { path: "/settings", component: Settings },
  { path: "/add", component: Add },
  { path: "/add/search", component: Search },
  { path: "/add/csv", component: CSV },
  { path: "/add/manual", component: Manual },
  { path: "/add/twins", component: Twins },
  { path: "/course/:id/edit", component: Edit },
  { path: "/course/:id", component: Details },
  { path: "/Feedback", component: Feedback },
  { path: "/import", component: Import },
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

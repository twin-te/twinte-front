import { MutationTree } from "vuex";
import { User, RegisteredCourse } from "~/api/@types";
import { Select } from "~/components/ToggleButton.vue";
import { GlobalState } from ".";
import { Toast } from "~/entities/toast";

export const mutations: MutationTree<GlobalState> = {
  setUser(state, user: User) {
    if (state.user !== null) {
      throw new Error("すでにユーザーが存在します。");
    }
    state.user = user;
  },
  setSidebar(state, show: boolean) {
    state.sidebar = show;
  },
  setCourses(state, courses: RegisteredCourse[]) {
    state.courses = courses;
  },
  setLabel(state, label: Select) {
    state.label = label;
  },
  setBachelorMode(state, mode: boolean) {
    state.bachelorMode = mode;
  },
  setTableTimeMode(state, show: boolean) {
    state.tableTimeMode = show;
  },
  setDisplayedYear(state, year: number | null) {
    state.displayedYear = year;
  },
  setModule(state, module) {
    state.module = module;
  },
  deleteCourse(state, id: string) {
    state.courses = state.courses.filter((course) => course.id !== id);
  },
  deleteToast(state, id: number) {
    state.toasts = state.toasts.filter((toast) => toast.id != id);
  },
  addCourse(state, course: RegisteredCourse) {
    state.courses.push(course);
  },
  addToast(state, toast: Toast) {
    state.toasts.push(toast);
  },
  updateCourse(state, newCourse: RegisteredCourse) {
    const idx = state.courses.findIndex((c) => c.id === newCourse.id);
    if (idx !== -1) state.courses.splice(idx, 1, newCourse);
  },
};

import { MutationTree } from "vuex";
import { User, RegisteredCourse } from "~/api/@types";
import { GlobalState } from ".";

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
  addCourse(state, course: RegisteredCourse) {
    state.courses.push(course);
  },
};

import { GetterTree } from "vuex";
import { RegisteredCourse } from "~/api/@types";
import { getKeysFromObj } from "~/util";
import { GlobalState } from ".";

export const getters: GetterTree<GlobalState, GlobalState> = {
  user: (state) => {
    return state.user;
  },
  sidebar: (state) => {
    return state.sidebar;
  },
  courses: (state) => {
    const years = getKeysFromObj<Record<number, RegisteredCourse[]>>(
      state.courses
    );
    return years.reduce<RegisteredCourse[]>(
      (courses, year) => [...courses, ...state.courses[year]],
      []
    );
  },
  coursesByYear: (state) => {
    return (year: number) => {
      return state.courses?.[year] ?? [];
    };
  },
  label: (state) => {
    return state.label;
  },
  bachelorMode: (state) => {
    return state.bachelorMode;
  },
  tableTimeMode: (state) => {
    return state.tableTimeMode;
  },
  saturdayCourseMode: (state) => {
    return state.saturdayCourseMode;
  },
  toasts: (state) => {
    return state.toasts;
  },
  displayedYear: (state) => {
    return state.displayedYear;
  },
  module: (state) => {
    return state.module;
  },
  tags: (state) => {
    return state.tags;
  },
};

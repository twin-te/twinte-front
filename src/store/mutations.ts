import { MutationTree } from "vuex";
import { User, RegisteredCourse, Tag } from "~/api/@types";
import { Select } from "~/components/ToggleButton.vue";
import { GlobalState } from ".";
import { Toast } from "~/entities/toast";
import { getKeysFromObj } from "~/util";

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
  setCourses(
    state,
    { year, courses }: { year: number; courses: RegisteredCourse[] }
  ) {
    state.courses[year] = courses;
  },
  setTags(state, tags: Tag[]) {
    state.tags = tags;
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
  setSaturdayCourseMode(state, mode: boolean) {
    state.saturdayCourseMode = mode;
  },
  setDisplayedYear(state, year: number | null) {
    state.displayedYear = year;
  },
  setModule(state, module) {
    state.module = module;
  },
  deleteCourse(state, id: string) {
    const years = getKeysFromObj<Record<number, RegisteredCourse[]>>(
      state.courses
    );
    years.forEach(
      (year) =>
        (state.courses[year] = state.courses[year].filter(
          (course) => course.id !== id
        ))
    );
  },
  deleteTag(state, id: string) {
    if (state.tags == undefined) return;
    state.tags = state.tags.filter((tag) => tag.id !== id);
    const years = getKeysFromObj<Record<number, RegisteredCourse[]>>(
      state.courses
    );
    const courses = years.reduce<RegisteredCourse[]>(
      (courses, year) => [...courses, ...state.courses[year]],
      []
    );
    courses.forEach(
      (course) => (course.tags = course.tags.filter((tag) => tag.id !== id))
    );
  },
  deleteToast(state, id: number) {
    state.toasts = state.toasts.filter((toast) => toast.id != id);
  },
  addCourse(state, course: RegisteredCourse) {
    state.courses[course.year].push(course);
  },
  addTag(state, tag: Tag) {
    if (state.tags == undefined) state.tags = [tag];
    else state.tags.push(tag);
  },
  addToast(state, toast: Toast) {
    state.toasts.push(toast);
  },
  updateCourse(state, newCourse: RegisteredCourse) {
    const year = newCourse.year;
    const idx = state.courses[year].findIndex((c) => c.id === newCourse.id);
    if (idx !== -1) state.courses[year].splice(idx, 1, newCourse);
  },
  updateTag(
    state,
    updatedTag: { id: string; name?: string; position?: number }
  ) {
    if (state.tags == undefined) return;
    const idx = state.tags.findIndex((tag) => tag.id === updatedTag.id);
    if (idx !== -1)
      state.tags.splice(idx, 1, { ...state.tags[idx], ...updatedTag });
  },
};

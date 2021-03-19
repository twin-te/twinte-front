import { RegisteredCourse, RegisteredCourseWithoutID } from "~/api/@types";
import { store } from "~/store";

/**
 * 登録済みの講義データを新たな講義データに更新する。
 */

export const updateRegisteredCourse = async (
  id: string,
  newCourse: RegisteredCourseWithoutID
): Promise<void> => {
  console.log("usecase: updateRegisteredCourse");
  /** API */
  // const { status, body: currentCourse } = await api.registered_courses._id(id).put({ body: newCourse });
  // if (status !== 200) return Promise.reject("講義の情報を更新できませんでした。");
  // store.commit("updateCourse", currentCourse);
  // storage.set("courses");
  // return;

  /** APIの代わり */
  const currentCourse = {} as RegisteredCourse;
  Object.assign(currentCourse, store.getters.course(id));
  ["name", "instructor", "credit", "methods", "schedules"].forEach((key) => {
    if (
      (currentCourse.course != null &&
        currentCourse.course[key] != newCourse[key]) ||
      currentCourse.course == null
    ) {
      currentCourse[key] = newCourse[key];
    }
  });
  ["memo", "attendance", "absence", "late", "tags"].forEach((key) => {
    currentCourse[key] = newCourse[key];
  });
  store.commit("updateCourse", currentCourse);
  return;
};

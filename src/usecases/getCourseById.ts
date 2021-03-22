import {
  Course,
  CourseMethod,
  CourseSchedule,
  RegisteredCourse,
} from "~/api/@types";
import { store } from "~/store";
import { reactive, ToRefs, toRefs } from "vue-demi";
import { apiToDisplayCourse, DisplayCourse } from "~/entities/course";
import { Ports } from "~/adapter";

/**
 * storeまたはAPIからidに該当する登録した講義データを取得する。
 */
// TODO: 関数名を getRegisterdCourseById などにする
export const getCourseById = ({ api }: Ports) => async (
  id: string
): Promise<RegisteredCourse> => {
  try {
    const storedCourse = (store.getters
      .courses as Array<RegisteredCourse>).find((c) => id === c.id);
    return storedCourse === undefined
      ? await api.registered_courses._id(id).$get()
      : storedCourse;
  } catch (error) {
    console.error(error);
    throw new Error("idに該当する講義が見つかりません");
  }
};

/**
 * APIからidに該当する講義データを取得する。
 */
// TODO: 関数名を整理する
export const searchCourseById = ({ api }: Ports) => async (
  id: string
): Promise<Course> => {
  try {
    // TODO: 年度は動的に取得する
    return await api.courses._year(2020)._code(id).$get();
  } catch (error) {
    console.error(error);
    throw new Error("idに該当する講義が見つかりません");
  }
};

export const useDisplayCourse = (ports: Ports) => async (
  id: string
): Promise<ToRefs<DisplayCourse>> => {
  const course = await getCourseById(ports)(id);
  const displayedCourse = apiToDisplayCourse(course);
  return toRefs(reactive(displayedCourse));
};

export const useRegisteredCourse = (ports: Ports) => async (id: string) => {
  const course = await getCourseById(ports)(id);
  return toRefs(
    reactive({
      name: "",
      instructor: "",
      methods: [] as CourseMethod[],
      schedules: [] as CourseSchedule[],
      ...course,
    })
  );
};

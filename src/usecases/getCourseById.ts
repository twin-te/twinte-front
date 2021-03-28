import {
  Course,
  CourseMethod,
  CourseSchedule,
  RegisteredCourse,
} from "~/api/@types";
import { apiToDisplayCourse, DisplayCourse } from "~/entities/course";
import { NetworkError, NetworkAccessError } from "~/usecases/error";
import { Ports } from "~/adapter";
import { reactive, ToRefs, toRefs } from "vue-demi";
import { store } from "~/store";

/**
 * storeまたはAPIからidに該当する登録した講義データを取得する。
 */
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

// TODO: getCourseByCode.ts などの適切なファイルに移動
// code と id を混合してました
/**
 * APIから code に該当する講義データを取得する。
 * 一部の code が不正だった場合エラーにならずにその code を除いた正常な講義データのみが返却される
 */
export const getCoursesByCode = ({ api }: Ports) => async (
  codes: string[]
): Promise<Course[]> => {
  // TODO: 年度は動的に取得する
  const { body, status, originalResponse } = await api.courses
    .get({
      query: {
        year: 2020,
        codes: codes.join(","),
      },
    })
    .catch(() => {
      throw new NetworkError();
    });
  if (200 <= status && status < 300) {
    return body;
  } else {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
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

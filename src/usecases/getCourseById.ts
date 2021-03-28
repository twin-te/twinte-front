import { Course, RegisteredCourse } from "~/api/@types";
import { store } from "~/store";
import { reactive, ToRefs, toRefs } from "vue-demi";
import { apiToDisplayCourse, DisplayCourse } from "~/entities/course";
import { Ports } from "~/adapter";

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

// TODO: 適切なファイルに移動
/**
 * APIから code に該当する講義データを取得する。
 */
export const getCoursesByCode = ({ api }: Ports) => async (
  codes: string[]
): Promise<Course[]> => {
  try {
    // TODO: 年度は動的に取得する
    return await api.courses.$get({
      query: {
        year: 2020,
        codes: codes.join(","),
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("codeに該当する講義が見つかりません");
  }
};

export const useDisplayCourse = (ports: Ports) => async (
  id: string
): Promise<ToRefs<DisplayCourse>> => {
  const course = await getCourseById(ports)(id);
  const displayedCourse = apiToDisplayCourse(course);
  return toRefs(reactive(displayedCourse));
};

import { RegisteredCourse } from "~/api/@types";
import { Methods } from "~/api/registered-courses/index";
import { Ports } from "~/adapter";

// TODO: addCourseBymanualとコードが重複してるので統合する。

/**
 * 講義情報をサーバに登録し、成功すれば Vuex にも登録する。
 */
export const bulkAddCourseById = ({ api, store }: Ports) => async (
  coursesId: string[]
) => {
  const registeredCourses: RegisteredCourse[] = [];
  for (const courseID of coursesId) {
    try {
      const { body: registeredCourse } = await api.registered_courses.post({
        // TODO: yaerの値を動的に取得する
        body: { year: 2020, code: courseID },
      });
      store.commit("addCourse", registeredCourse);
      registeredCourses.push(registeredCourse);
    } catch (error) {
      console.error(error);
    }
  }
  return registeredCourses;
};

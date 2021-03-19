import { usePorts } from "~/usecases/index";
import { Course } from "~/api/@types";

const { api, store } = usePorts();

/**
 * 講義情報をサーバに登録し、成功すれば Vuex にも登録する。
 */
export const addCourseByManual = async (course: Course) => {
  try {
    const {
      body: registeredCourse,
      status: status,
    } = await api.registered_courses.post({
      body: course,
    });
    if (status !== 200) throw "PostManualCourse result is NOT 200";
    store.commit("addCourse", registeredCourse);
    return registeredCourse;
  } catch (error) {
    console.error(error);
    return false;
  }
};

import { usePorts } from "~/usecases/index";
import { Methods } from "~/api/registered-courses/index";
import { RegisteredCourseWithoutID } from "~/api/@types";
import { Ports } from "~/adapter";

export const formatCourse = (
  course: RegisteredCourseWithoutID
): Methods["post"]["reqBody"] => ({
  year: course.year,
  name: course.name ?? "",
  instructor: course.instructor ?? "",
  credit: course.credit ?? -1,
  methods: course.methods ?? [],
  schedules: course.schedules ?? [],
  tags: course.tags,
});

/**
 * 講義情報をサーバに登録し、成功すれば Vuex にも登録する。
 */
export const addCourseByManual = ({ api, store }: Ports) => async (
  course: RegisteredCourseWithoutID
) => {
  console.dir(course);
  try {
    const {
      body: registeredCourse,
      status: status,
    } = await api.registered_courses.post({
      body: formatCourse(course),
    });
    if (status !== 200) throw "Result is NOT 200";
    store.commit("addCourse", registeredCourse);
    return registeredCourse;
  } catch (error) {
    console.error(error);
    return false;
  }
};

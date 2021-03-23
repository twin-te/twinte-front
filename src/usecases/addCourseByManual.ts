import { Methods } from "~/api/registered-courses/index";
import { RegisteredCourseWithoutID } from "~/api/@types";
import { Ports } from "~/adapter";

export const adaptToApi = (
  course: RegisteredCourseWithoutID
): Methods["post"]["reqBody"] => ({
  year: course.year,
  name: course.name ?? "",
  instructor: course.instructor ?? "",
  credit: course.credit ?? 0,
  methods: course.methods ?? [],
  schedules: course.schedules ?? [],
  tags: course.tags,
});

/**
 * 講義情報をサーバに登録し、成功すれば Vuex にも登録する。
 */
export const addCourseByManual = ({ api, store }: Ports) => async (
  course: Methods["post"]["reqBody"]
) => {
  try {
    const { body: registeredCourse } = await api.registered_courses.post({
      body: course,
    });
    store.commit("addCourse", registeredCourse);
    return registeredCourse;
  } catch (error) {
    console.error(error);
    return void 0;
  }
};

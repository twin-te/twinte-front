import { isValidStatus } from "~/usecases/api";
import { Methods } from "~/api/registered-courses/index";
import { NetworkError, NetworkAccessError } from "~/usecases/error";
import { Ports } from "~/adapter";
import { RegisteredCourseWithoutID } from "~/api/@types";

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
  const { body, status, originalResponse } = await api.registered_courses
    .post({
      body: course,
    })
    .catch(() => {
      throw new NetworkError();
    });
  if (isValidStatus(status)) {
    store.commit("addCourse", body);
    return body;
  } else {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
};

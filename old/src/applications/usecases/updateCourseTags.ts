import { Ports } from "~/adapter";
import {
  RegisteredCourse,
  RegisteredCourseWithoutID,
  TagIdOnly,
} from "~/api/@types";
import { isValidStatus } from "./api";
import { NetworkAccessError, NetworkError } from "./error";
import { getCourseById } from "./getCourseById";

/**
 * 授業に紐付けるタグを更新する
 */
export const updateCourseTags = (ports: Ports) => async ({
  courseId,
  assignedTags,
}: {
  courseId: string;
  assignedTags: TagIdOnly[];
}): Promise<RegisteredCourse> => {
  const course = await getCourseById(ports)(courseId);
  if (course == undefined)
    throw new Error("該当する授業が登録されていません。");
  const { api, store } = ports;
  const newCourses = { ...course, tags: assignedTags };
  const { body, status, originalResponse } = await api.registered_courses
    ._id(courseId)
    .put({
      body: newCourses as {
        course: { id: string };
      } & RegisteredCourseWithoutID,
    })
    .catch(() => {
      throw new NetworkError();
    });
  if (isValidStatus(status)) {
    store.commit("updateCourse", body);
    return body;
  } else {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
};

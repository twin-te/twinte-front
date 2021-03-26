import { RegisteredCourse } from "~/api/@types";
import { Ports } from "~/adapter";

/**
 * 出欠カウントを更新する。
 */

export const updateCourse = ({ api }: Ports) => async (
  course: Required<RegisteredCourse>
): Promise<RegisteredCourse> => {
  try {
    const currentCourse = await api.registered_courses
      ._id(course.id)
      .$put({ body: course });
    return currentCourse;
  } catch (error) {
    return course;
  }
};

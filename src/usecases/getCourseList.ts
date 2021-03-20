import { Ports } from "~/adapter";
import { RegisteredCourse } from "~/api/@types";

/**
 * 登録されている講義を取得する
 */
export const getCourseList = async ({
  api,
  store,
  dayjs,
}: Ports): Promise<RegisteredCourse[]> => {
  const courses: RegisteredCourse[] = store.getters.courses;
  if (courses.length > 0) return courses;
  const now = dayjs();
  const year = now.month() < 3 ? now.year() - 1 : now.year();
  try {
    const storedCourses = await api.registered_courses.$get({
      query: { year },
    });
    store.commit("setCourses", storedCourses);
    return storedCourses;
  } catch (error) {
    console.error(error);
    return [];
  }
};

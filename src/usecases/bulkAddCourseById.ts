import { NetworkAccessError } from "~/usecases/error";
import { Ports } from "~/adapter";

/**
 * 講義情報をサーバに登録し、成功すれば Vuex にも登録する。
 */
export const bulkAddCourseById = ({ api, store }: Ports) => async (
  codes: string[]
) => {
  // const { body, headers, status } = await api.registered_courses.post({
  const { body, status, originalResponse } = await api.registered_courses.post({
    body: codes.map((code) => ({
      code,
      year: 2020,
    })),
  });
  store.commit("addCourses", body);
  if (200 <= status && status < 300) {
    return body;
  } else {
    console.error(body);
    console.error(originalResponse);
    throw new NetworkAccessError(originalResponse);
  }
};

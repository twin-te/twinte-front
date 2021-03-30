import { RegisteredCourse } from "~/api/@types";
import { isValidStatus } from "~/usecases/api";
import { NetworkError, NetworkAccessError } from "~/usecases/error";
import { Ports } from "~/adapter";
import { getYear } from "./getYear";

/**
 * 講義情報をサーバに登録し、成功すれば Vuex にも登録する。
 */
export const bulkAddCourseById = (ports: Ports) => async (codes: string[]) => {
  const { api, store } = ports;
  const year = await getYear(ports);
  const { body, status, originalResponse } = await api.registered_courses
    .post({
      body: codes.map((code) => ({
        code,
        year,
      })),
    })
    .catch(() => {
      throw new NetworkError();
    });
  // bodyの型ごとに条件分岐
  if (codes.length === 1) {
    store.commit("addCourse", body);
  } else {
    (body as RegisteredCourse[]).map((course) =>
      store.commit("addCourse", course)
    );
  }
  if (isValidStatus(status)) {
    return body;
  } else {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
};

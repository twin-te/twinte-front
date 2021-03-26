import { Ports } from "~/adapter";

// TODO: addCourseBymanualとコードが重複してるので統合する。

/**
 * 講義情報をサーバに登録し、成功すれば Vuex にも登録する。
 */
export const bulkAddCourseById = ({ api, store }: Ports) => async (
  codes: string[]
) => {
  try {
    const { body: registeredCourses } = await api.registered_courses.post({
      body: codes.map((code) => ({
        code,
        year: 2020,
      })),
    });
    store.commit("addCourses", registeredCourses);
    return registeredCourses;
  } catch (error) {
    console.error(error);
    throw new Error("授業の登録に失敗しました。");
  }
};

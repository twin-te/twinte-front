import { Ports } from "~/adapter";

/**
 * ローカルストレージまたはAPIから登録済みの講義データを取得して、storeに保存する。
 */
export const setRegisteredCourses = ({
  api,
  store,
  now,
}: Ports) => async (): Promise<void> => {
  try {
    console.log("usecase: setRegisteredCourses");
    const registeredCourses = await api.registered_courses.$get({
      query: { year: now.year() },
    });
    store.commit("setCourses", registeredCourses);
  } catch (error) {
    throw new Error("登録された講義を取得できませんでした。");
  }
};

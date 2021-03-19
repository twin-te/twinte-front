import { Ports } from "~/adapter";

/**
 * idに該当する登録済みの講義を削除する。
 */

export const deleteRegisteredCourse = ({ api }: Ports) => async (
  id: string
) => {
  try {
    await api.registered_courses._id(id).$delete();
  } catch (error) {
    return;
  }
};

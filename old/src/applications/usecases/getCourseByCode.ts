import { Course } from "~/api/@types";
import { isValidStatus } from "~/usecases/api";
import { NetworkError, NetworkAccessError } from "~/usecases/error";
import { Ports } from "~/adapter";
import { getYear } from "./getYear";

/**
 * APIから code に該当する講義データを取得する。
 * 一部の code が不正だった場合エラーにならずにその code を除いた正常な講義データのみが返却される
 */
export const getCoursesByCode = (ports: Ports) => async (
  codes: string[]
): Promise<{ courses: Course[]; missingCourseCodes: string[] }> => {
  const { api } = ports;
  const year = await getYear(ports);
  const { body, status, originalResponse } = await api.courses
    .get({
      query: {
        year,
        codes: codes.join(","),
      },
    })
    .catch(() => {
      throw new NetworkError();
    });
  if (isValidStatus(status)) {
    const fetchedCourseCodes = body.map((v) => v.code);
    const missingCourseCodes = codes.filter(
      (code) => !fetchedCourseCodes.includes(code)
    );
    return { courses: body, missingCourseCodes };
  } else {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
};

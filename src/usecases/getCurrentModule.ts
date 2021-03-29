import { ModuleJa, moduleMap } from "~/entities/module";
import { NetworkAccessError, NetworkError } from "~/usecases/error";
import { Ports } from "~/adapter";
import { isValidStatus } from "~/usecases/api";

/**
 * 現在の学期を取得する
 */
export const getCurrentModule = async ({
  api,
  dayjs,
}: Ports): Promise<ModuleJa> => {
  const now = dayjs();
  const year = now.month() < 3 ? now.year() - 1 : now.year();
  const { body, status, originalResponse } = await api.school_calendar.modules
    .get({
      query: { year },
    })
    .catch((error) => {
      console.error(error);
      throw new NetworkError();
    });
  if (!isValidStatus(status)) {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
  const info = body.find((info) => {
    const start = dayjs(info.start);
    const end = dayjs(info.end);
    return (
      (start.isBefore(now) || start.isSame(now)) &&
      (end.isAfter(now) || end.isSame(now))
    );
  });
  switch (info?.module) {
    case undefined:
      return "春A";
    case "SummerVacation":
      return "春C";
    case "SpringVacation":
      return "秋C";
    default:
      // TODO: もっといい方法があるはず
      return info !== undefined ? moduleMap[info.module] ?? "春A" : "春A";
  }
};

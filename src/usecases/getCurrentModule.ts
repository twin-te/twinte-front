import { Ports } from "~/adapter";
import { CourseModule } from "~/api/@types";
import { ModuleJa, moduleMap } from "~/entities/module";

/**
 * 現在の学期を取得する
 */
export const getCurrentModule = async ({
  api,
  dayjs,
}: Ports): Promise<ModuleJa> => {
  try {
    const now = dayjs();
    const year = now.month() < 3 ? now.year() - 1 : now.year();
    const moduleInfoList = await api.school_calendar.modules.$get({
      query: { year },
    });
    const info = moduleInfoList.find((info) => {
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
  } catch (error) {
    console.error(error);
    return "春A";
  }
};

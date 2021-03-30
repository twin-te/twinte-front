import { Ports } from "~/adapter";

export const getYear = async ({ dayjs, api }: Ports) => {
  const now = dayjs();
  const timeTable = await api.timetable._date(now.format("YYYY-MM-DD")).$get();
  return timeTable.module?.year ?? 2021;
};

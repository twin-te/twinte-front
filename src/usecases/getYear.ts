import { Ports } from "~/adapter";

export const getYear = async ({
  dayjs,
  api,
  store,
}: Ports): Promise<number> => {
  const now = dayjs();
  // const timeTable = await api.timetable._date(now.format("YYYY-MM-DD")).$get();
  // return timeTable.module?.year ?? 2021;
  return (
    store.getters.displayedYear ??
    (now.month() < 3 ? now.year() - 1 : now.year())
  );
};

import { Ports } from "~/adapter";
import { Calendar } from "~/components/PageHeader.vue";
import { dayJaList } from "~/entities/day";

/**
 * カレンダーを返す
 */
export const getCalendar = async ({ now }: Ports): Promise<Calendar> => {
  const day = now.daysInMonth();
  const month = now.month() + 1;
  const schedule = "休日";
  const week = dayJaList[now.day()];
  return {
    day,
    month,
    schedule,
    week,
  };
};

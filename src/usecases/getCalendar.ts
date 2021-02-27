import { Ports } from "~/adapter";
import { Calendar } from "~/components/PageHeader.vue";

/**
 * カレンダーを返す
 */
export const getCalendar = async ({ now }: Ports): Promise<Calendar> => {
  const day = now.daysInMonth();
  const month = now.month() + 1;
  const schedule = "通常日課";
  const week = ["日", "月", "火", "水", "木", "金", "土"][now.day()];
  return {
    day,
    month,
    schedule,
    week,
  };
};

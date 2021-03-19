import { CourseSchedule } from "~/api/@types";

export type Schedule = {
  module: string;
  day: string;
  period: string;
  room: string;
};

const defaultValue = "指定なし";

export const apiToDisplaySchedule = (api: CourseSchedule[]): Schedule[] => {
  return api.map(({ day, module, period, room }) => ({
    day,
    module,
    period: period === 0 ? defaultValue : String(period),
    room: room === "" ? defaultValue : room,
  }));
};

import { isEqualSchedule, Schedule } from "./schedule";

export type Room = {
  name: string;
  schedules: Schedule[];
};

/**
 * Return rooms whose schedules contain target schedule.
 */
export const extractRoomsBySchedule = (
  rooms: Room[],
  targetSchedule: Schedule
): Room[] => {
  return rooms.filter(({ schedules }) =>
    schedules.some((schedule) => isEqualSchedule(schedule, targetSchedule))
  );
};

import { Day, Room, Schedule } from "~/domain";
import { getRoomsFromSchedule } from "~/domain/utils";
import { isNormalDay, isNormalSchedule, isPeriod } from "~/domain/validations";
import { getKeysFromObj, isEqualSet, removeDuplicate } from "~/utils";
import * as ApiType from "../aspida/@types";

export const isEqualCourseSchedules = (
  schedules1: ApiType.CourseSchedule[],
  schedules2: ApiType.CourseSchedule[]
): boolean => {
  const getSet = (schedules: ApiType.CourseSchedule[]): Set<string> =>
    new Set(
      schedules.map(
        ({ module, day, period, room }) => `${module}-${day}-${period}-${room}`
      )
    );

  const s1 = getSet(schedules1);
  const s2 = getSet(schedules2);

  return isEqualSet(s1, s2);
};

export const parseRoom = (row: string): string[] => {
  return removeDuplicate(row.split(/,| /).map((room) => room.trim()));
};

export const apiToSchedules = (
  apiSchedules: ApiType.CourseSchedule[]
): { schedules: Schedule[]; rooms: Room[] } => {
  const roomNameToSchedules: Record<string, Schedule[]> = {};

  const schedules = apiSchedules
    .filter(({ module, day, period }) => {
      module !== "Unknown" && day !== "Unknown" && isPeriod(String(period));
    })
    .map(({ module, day, period, room: rowRoom }) => {
      const schedule = (isNormalDay(day as Day)
        ? { module, day, period: String(period) }
        : { module, day }) as Schedule;
      const roomNames: string[] = parseRoom(rowRoom);

      roomNames.forEach((room) => {
        if (room in roomNameToSchedules)
          roomNameToSchedules[room].push(schedule);
        else roomNameToSchedules[room] = [schedule];
      });

      return schedule;
    });

  const rooms: Room[] = getKeysFromObj(roomNameToSchedules).map((roomName) => ({
    name: roomName,
    schedules: roomNameToSchedules[roomName],
  }));

  return {
    schedules,
    rooms,
  };
};

/**
 * Convert schedules from domain type to api type.
 * Set the period of special schedules to 0.
 */
export const schedulesToApi = (
  schedules: Schedule[],
  rooms: Room[]
): ApiType.CourseSchedule[] => {
  return schedules.map((schedule) => {
    const room: string = getRoomsFromSchedule(rooms, schedule)
      .map(({ name }) => name)
      .join(",");
    return {
      module: schedule.module,
      day: schedule.day,
      period: isNormalSchedule(schedule) ? Number(schedule.period) : 0,
      room,
    };
  });
};

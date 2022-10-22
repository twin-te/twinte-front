import { isSpecialDay, normalDays, specialDays } from "~/domain/day";
import { Module, modules } from "~/domain/module";
import { isPeriod, periods } from "~/domain/period";
import { extractRoomsBySchedule, Room } from "~/domain/room";
import { isNormalSchedule, Schedule } from "~/domain/schedule";
import {
  initializeNormalTimetable,
  initializeSpecialTimetable,
  NormalTimetable,
  SpecialTimetable,
} from "~/domain/timetable";
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
  const normalTimetable: NormalTimetable<
    Module,
    boolean
  > = initializeNormalTimetable(modules, false);
  const specialTimetable: SpecialTimetable<
    Module,
    boolean
  > = initializeSpecialTimetable(modules, false);
  const roomNameToSchedules: Record<string, Schedule[]> = {};

  apiSchedules.forEach(({ module, day, period: numPeriod, room: rowRoom }) => {
    const period = String(numPeriod);
    const roomNames = parseRoom(rowRoom);

    // Bug : Annual is invalid module. Backend will be remove Annual in the future.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (module === "Unknown" || day === "Unknown" || module === "Annual")
      return;
    if (isSpecialDay(day)) {
      specialTimetable[module][day] = true;
      roomNames.forEach((roomName) => {
        if (roomName in roomNameToSchedules)
          roomNameToSchedules[roomName].push({ module, day });
        else roomNameToSchedules[roomName] = [{ module, day }];
      });
    } else if (isPeriod(period)) {
      normalTimetable[module][day][period] = true;
      roomNames.forEach((roomName) => {
        if (roomName in roomNameToSchedules)
          roomNameToSchedules[roomName].push({ module, day, period });
        else roomNameToSchedules[roomName] = [{ module, day, period }];
      });
    }
  });

  const schedules: Schedule[] = [];

  modules.forEach((module) => {
    normalDays.forEach((day) =>
      periods.forEach((period) => {
        if (normalTimetable[module][day][period]) {
          schedules.push({ module, day, period });
        }
      })
    );
    specialDays.forEach((day) => {
      if (specialTimetable[module][day]) {
        schedules.push({ module, day });
      }
    });
  });

  const rooms: Room[] = getKeysFromObj(roomNameToSchedules)
    .filter((roomName) => roomName !== "")
    .map((roomName) => ({
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
    const room: string = extractRoomsBySchedule(rooms, schedule)
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

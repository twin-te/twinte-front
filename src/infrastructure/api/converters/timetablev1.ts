import { Course, RegisteredCourse } from "~/domain/course";
import { Day, isNormalDay } from "~/domain/day";
import { Method } from "~/domain/method";
import { Module } from "~/domain/module";
import { Period, isPeriod } from "~/domain/period";
import { Room, extractRoomsBySchedule } from "~/domain/room";
import { Schedule, isNormalSchedule } from "~/domain/schedule";
import { Tag } from "~/domain/tag";
import * as TimetableV1PB from "~/infrastructure/api/gen/timetable/v1/type_pb";
import { getKeysFromObj, removeDuplicate } from "~/utils";
import { fromPBAcademicYear, fromPBUUID } from "./shared";
import { assurePresence } from "./utils";

export const fromPBModule = (pbModule: TimetableV1PB.Module): Module => {
  switch (pbModule) {
    case TimetableV1PB.Module.SPRING_A:
      return "SpringA";
    case TimetableV1PB.Module.SPRING_B:
      return "SpringB";
    case TimetableV1PB.Module.SPRING_C:
      return "SpringC";
    case TimetableV1PB.Module.FALL_A:
      return "FallA";
    case TimetableV1PB.Module.FALL_B:
      return "FallB";
    case TimetableV1PB.Module.FALL_C:
      return "FallC";
    case TimetableV1PB.Module.SUMMER_VACATION:
      return "SummerVacation";
    case TimetableV1PB.Module.SPRING_VACATION:
      return "SpringVacation";
  }
  throw Error(`invalid enum ${pbModule}`);
};

export const toPBModule = (module: Module): TimetableV1PB.Module => {
  switch (module) {
    case "SpringA":
      return TimetableV1PB.Module.SPRING_A;
    case "SpringB":
      return TimetableV1PB.Module.SPRING_B;
    case "SpringC":
      return TimetableV1PB.Module.SPRING_C;
    case "FallA":
      return TimetableV1PB.Module.FALL_A;
    case "FallB":
      return TimetableV1PB.Module.FALL_B;
    case "FallC":
      return TimetableV1PB.Module.FALL_C;
    case "SummerVacation":
      return TimetableV1PB.Module.SUMMER_VACATION;
    case "SpringVacation":
      return TimetableV1PB.Module.SPRING_VACATION;
  }
};

export const fromPBDay = (pbDay: TimetableV1PB.Day): Day => {
  switch (pbDay) {
    case TimetableV1PB.Day.SUN:
      return "Sun";
    case TimetableV1PB.Day.MON:
      return "Mon";
    case TimetableV1PB.Day.TUE:
      return "Tue";
    case TimetableV1PB.Day.WED:
      return "Wed";
    case TimetableV1PB.Day.THU:
      return "Thu";
    case TimetableV1PB.Day.FRI:
      return "Fri";
    case TimetableV1PB.Day.SAT:
      return "Sat";
    case TimetableV1PB.Day.INTENSIVE:
      return "Intensive";
    case TimetableV1PB.Day.APPOINTMENT:
      return "Appointment";
    case TimetableV1PB.Day.ANY_TIME:
      return "AnyTime";
  }
  throw Error(`invalid enum ${pbDay}`);
};

export const toPBDay = (day: Day): TimetableV1PB.Day => {
  switch (day) {
    case "Sun":
      return TimetableV1PB.Day.SUN;
    case "Mon":
      return TimetableV1PB.Day.MON;
    case "Tue":
      return TimetableV1PB.Day.TUE;
    case "Wed":
      return TimetableV1PB.Day.WED;
    case "Thu":
      return TimetableV1PB.Day.THU;
    case "Fri":
      return TimetableV1PB.Day.FRI;
    case "Sat":
      return TimetableV1PB.Day.SAT;
    case "Intensive":
      return TimetableV1PB.Day.INTENSIVE;
    case "Appointment":
      return TimetableV1PB.Day.APPOINTMENT;
    case "AnyTime":
      return TimetableV1PB.Day.ANY_TIME;
  }
};

export const fromPBPeriod = (pbPeriod: number): Period => {
  const period = pbPeriod.toString();
  if (isPeriod(period)) {
    return period;
  }
  throw Error(`invalid period ${pbPeriod}`);
};

export const toPBPeriod = (period: Period): number => {
  return Number(period);
};

export const fromPBCourseMethod = (
  pbCourseMethod: TimetableV1PB.CourseMethod
): Method => {
  switch (pbCourseMethod) {
    case TimetableV1PB.CourseMethod.ONLINE_ASYNCHRONOUS:
      return "Asynchronous";
    case TimetableV1PB.CourseMethod.ONLINE_SYNCHRONOUS:
      return "Synchronous";
    case TimetableV1PB.CourseMethod.FACE_TO_FACE:
      return "FaceToFace";
    case TimetableV1PB.CourseMethod.OTHERS:
      return "Others";
  }
  throw Error(`invalid enum ${pbCourseMethod}`);
};

export const toPBCourseMethod = (
  courseMethod: Method
): TimetableV1PB.CourseMethod => {
  switch (courseMethod) {
    case "Asynchronous":
      return TimetableV1PB.CourseMethod.ONLINE_ASYNCHRONOUS;
    case "Synchronous":
      return TimetableV1PB.CourseMethod.ONLINE_SYNCHRONOUS;
    case "FaceToFace":
      return TimetableV1PB.CourseMethod.FACE_TO_FACE;
    case "Others":
      return TimetableV1PB.CourseMethod.OTHERS;
  }
};

export const fromPBInstructors = (pbInstructors: string): string[] => {
  return removeDuplicate(
    pbInstructors.split(/,|、/).map((instructor) => instructor.trim())
  );
};

export const toPBInstructors = (instructors: string[]): string => {
  return instructors.join(",");
};

export const fromPBCredit = (pbCredit: string): number => {
  return parseFloat(pbCredit);
};

export const toPBCredit = (credit: number): string => {
  return credit.toFixed(1);
};

export const parseRoom = (row: string): string[] => {
  return removeDuplicate(row.split(/,| /).map((room) => room.trim())).filter(
    (roomName) => roomName !== ""
  );
};

const fromPBSchedule = (pbSchedule: TimetableV1PB.Schedule): Schedule => {
  const module = fromPBModule(pbSchedule.module);
  const day = fromPBDay(pbSchedule.day);

  if (isNormalDay(day)) {
    return {
      module,
      day,
      period: fromPBPeriod(pbSchedule.period),
    };
  }

  return { module, day };
};

export const fromPBSchedules = (
  pbSchedules: TimetableV1PB.Schedule[]
): { schedules: Schedule[]; rooms: Room[] } => {
  const schedules: Schedule[] = [];
  const roomNameToSchedules: Record<string, Schedule[]> = {};

  pbSchedules.forEach((pbSchedule) => {
    const schedule = fromPBSchedule(pbSchedule);
    schedules.push(schedule);

    const roomNames = parseRoom(pbSchedule.rooms);
    roomNames.forEach((roomName) => {
      if (roomName in roomNameToSchedules)
        roomNameToSchedules[roomName].push(schedule);
      else roomNameToSchedules[roomName] = [schedule];
    });
  });

  const rooms: Room[] = getKeysFromObj(roomNameToSchedules).map((roomName) => ({
    name: roomName,
    schedules: roomNameToSchedules[roomName],
  }));

  return { schedules, rooms };
};

export const toPBSchedules = (
  schedules: Schedule[],
  rooms: Room[]
): TimetableV1PB.Schedule[] => {
  return schedules.map((schedule) => {
    const pbRooms = extractRoomsBySchedule(rooms, schedule)
      .map(({ name }) => name)
      .join(",");
    return new TimetableV1PB.Schedule({
      module: toPBModule(schedule.module),
      day: toPBDay(schedule.day),
      period: isNormalSchedule(schedule) ? toPBPeriod(schedule.period) : 0,
      rooms: pbRooms,
    });
  });
};

export const fromPBCourse = (pbCourse: TimetableV1PB.Course): Course => {
  const { schedules, rooms } = fromPBSchedules(pbCourse.schedules);
  return {
    id: fromPBUUID(assurePresence(pbCourse.id)),
    year: fromPBAcademicYear(assurePresence(pbCourse.year)),
    code: pbCourse.code,
    name: pbCourse.name,
    instructors: fromPBInstructors(pbCourse.instructors),
    credit: fromPBCredit(pbCourse.credit),
    overview: pbCourse.overview,
    remarks: pbCourse.remarks,
    recommendedGrades: pbCourse.recommendedGrades,
    methods: pbCourse.methods.map(fromPBCourseMethod),
    schedules,
    rooms,
  };
};

export const fromPBRegisteredCourse = (
  pbRegisteredCourse: TimetableV1PB.RegisteredCourse
): RegisteredCourse => {
  const { schedules, rooms } = fromPBSchedules(pbRegisteredCourse.schedules);
  return {
    id: fromPBUUID(assurePresence(pbRegisteredCourse.id)),
    year: fromPBAcademicYear(assurePresence(pbRegisteredCourse.year)),
    code: pbRegisteredCourse?.code,
    name: pbRegisteredCourse.name,
    instructors: fromPBInstructors(pbRegisteredCourse.instructors),
    credit: parseFloat(pbRegisteredCourse.credit),
    methods: pbRegisteredCourse.methods.map(fromPBCourseMethod),
    schedules,
    rooms,
    memo: pbRegisteredCourse.memo,
    attendance: pbRegisteredCourse.attendance,
    absence: pbRegisteredCourse.absence,
    late: pbRegisteredCourse.late,
    tagIds: pbRegisteredCourse.tagIds.map(fromPBUUID),
  };
};

export const fromPBTag = (pbTag: TimetableV1PB.Tag): Tag => {
  return {
    id: fromPBUUID(assurePresence(pbTag.id)),
    name: pbTag.name,
    order: pbTag.position,
  };
};

import { RegisteredCourse, CourseSchedule } from "~/api/@types";
import { jaToDay } from "./day";
import { jaToModule } from "~/entities/module";
import { jaToMethod, MethodJa, methodToJa } from "./method";
import { apiToSchedule, Schedule, scheduleToApi } from "~/entities/schedule";
import { periodToString } from "~/usecases/periodToString";

export type DisplayCourse = {
  code: string;
  name: string;
  date: string;
  instructor: string;
  room: string;
  method: string;
  courseId: string;
  memo: string;
  attendance: number;
  absence: number;
  late: number;
  registeredCourse: RegisteredCourse;
  schedules: Schedule[];
};

export const displayCourseToApi = (
  displayedCourse: Partial<DisplayCourse> &
    Pick<DisplayCourse, "registeredCourse" | "absence" | "attendance" | "late">,
  methods?: MethodJa[]
): RegisteredCourse => ({
  ...displayedCourse.registeredCourse,
  attendance: displayedCourse.attendance,
  absence: displayedCourse.absence,
  late: displayedCourse.late,
  memo: displayedCourse.memo ?? "",
  name: displayedCourse.name ?? "",
  instructor: displayedCourse.instructor ?? "",
  schedules: scheduleToApi(
    displayedCourse.schedules ?? [],
    displayedCourse.room ?? ""
  ),
  methods:
    methods?.map(jaToMethod) ??
    displayedCourse.registeredCourse.methods ??
    displayedCourse.registeredCourse.course?.methods ??
    [],
});

const blankToChar = (value: string | undefined, char: string) =>
  value === undefined || value === "" ? char : value;

export const apiToDisplayCourse = (
  registeredCourse: RegisteredCourse,
  char: string
): DisplayCourse => ({
  code: blankToChar(registeredCourse.course?.code, char),
  name: blankToChar(
    registeredCourse.name ?? registeredCourse.course?.name,
    char
  ),
  date: blankToChar(
    periodToString(
      registeredCourse?.schedules ?? registeredCourse.course?.schedules ?? []
    ),
    char
  ),
  instructor: blankToChar(
    registeredCourse.instructor ?? registeredCourse.course?.instructor,
    char
  ),
  room: blankToChar(
    Array.from(
      new Set(
        (
          registeredCourse?.schedules ??
          registeredCourse.course?.schedules ??
          []
        ).map((s) => s.room)
      )
    ).join(", "),
    char
  ),
  method: blankToChar(
    (registeredCourse.methods ?? registeredCourse.course?.methods ?? [])
      .map(methodToJa)
      .join(", "),
    char
  ),
  courseId: registeredCourse.id,
  attendance: registeredCourse.attendance,
  absence: registeredCourse.absence,
  late: registeredCourse.late,
  memo: registeredCourse.memo,
  schedules: apiToSchedule(
    registeredCourse.schedules ?? registeredCourse.course?.schedules ?? []
  ),
  registeredCourse,
});

/**
 * 日本語の学期名などを api の形式に合うようにフォーマットする
 */
export const formatSchedule = (schedule: Schedule[]): CourseSchedule[] => {
  return schedule.map(({ module, day, period }) => ({
    module: module === "指定なし" ? "Unknown" : jaToModule(module),
    day: day === "指定なし" || day === "その他" ? "Unknown" : jaToDay(day),
    period: Number(period),
    room: "",
  }));
};

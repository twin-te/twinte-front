import {
  Course,
  CourseMethod,
  CourseSchedule,
  RegisteredCourse,
  RegisteredCourseWithoutID,
} from "~/api/@types";
import { jaToMethod, methodToJa } from "~/entities/method";
import { apiToSchedule, scheduleToApi } from "~/entities/schedule";
import { periodToString } from "~/usecases/periodToString";
import { DisplayCourse } from "~/entities/course";

export type ApiCourse = { course?: Course } & RegisteredCourseWithoutID;

/**
 * CourseMethod[] を比較する。
 */
const isEqualMethods = (m1: CourseMethod[], m2: CourseMethod[]): boolean => {
  return m1.length === m2.length && m1.every((m) => m2.includes(m));
};

/**
 * 文字列に変換して CourseSchedule[] を比較する。
 */
const isEqualSchedules = (
  s1: CourseSchedule[],
  s2: CourseSchedule[]
): boolean => {
  if (s1.length !== s2.length) return false;
  const keys: (keyof CourseSchedule)[] = ["module", "day", "period", "room"];
  const arr = s1.map((s) => keys.map((k) => s[k]).join(" "));
  return s2.every((s) => arr.includes(keys.map((k) => s[k]).join(" ")));
};

/**
 * `updateOptionalProp` で変更を行いたいプロパティ
 */
type Target = Pick<
  Required<RegisteredCourse> & Course,
  "name" | "credit" | "instructor" | "methods" | "schedules"
>;

/**
 * `Target` に含まれるプロパティのうち `RegisteredCourse[prop]` または `RegisteredCourse["course"][prop]` を `newValue` に更新する
 *
 * @param course 変更対象となる RegisteredCourse
 * @param prop 変更したい Target に含まれるプロパティ
 * @param newValue 新たな値
 * @param isEqual 比較関数, デフォルトはプリミティブ用
 */
const updateOptionalProp = <P extends keyof Target>(
  course: Pick<ApiCourse, "course" | keyof Target>,
  prop: P,
  newValue: Target[P],
  isEqual: (v1: Target[P], v2: Target[P]) => boolean = (v1, v2) => v1 === v2
) => {
  if (
    course[prop] != undefined ||
    course.course == undefined ||
    !isEqual(course.course[prop], newValue)
  )
    course[prop] = newValue;
};

/**
 * displayCourse から baseCourse をもとに更新後の ApiCourse を作成する。
 * `optionalProps` で更新したいオプショナルなプロパティを指定する。
 */
export const displayCourseToApi = (
  displayCourse: DisplayCourse,
  baseCourse: ApiCourse,
  optionalProps: (keyof Target)[] = []
): ApiCourse => {
  const course: ApiCourse = {
    ...baseCourse,
    memo: displayCourse.memo,
    attendance: displayCourse.attendance,
    absence: displayCourse.absence,
    late: displayCourse.late,
  };

  // name
  if (optionalProps.includes("name"))
    updateOptionalProp(course, "name", displayCourse.name);

  // instructor
  if (optionalProps.includes("instructor"))
    updateOptionalProp(course, "instructor", displayCourse.instructor);

  // credit
  if (optionalProps.includes("credit"))
    updateOptionalProp(course, "credit", Number(displayCourse.credit));

  // methods
  if (optionalProps.includes("methods")) {
    const methods: CourseMethod[] = displayCourse.methods.map(jaToMethod);
    updateOptionalProp(course, "methods", methods, isEqualMethods);
  }

  // schedules
  if (optionalProps.includes("schedules")) {
    const schedules: CourseSchedule[] = scheduleToApi(
      displayCourse.schedules,
      displayCourse.room
    );
    updateOptionalProp(course, "schedules", schedules, isEqualSchedules);
  }

  return course;
};

const blankToChar = (value: string | undefined, char: string) =>
  value === undefined || value === "" ? char : value;

/**
 * baseCourse をもとに 表示用の授業を作成する。
 */
export const apiToDisplayCourse = (
  baseCourse: ApiCourse,
  char: string
): DisplayCourse => ({
  code: blankToChar(baseCourse.course?.code, char),
  name: blankToChar(baseCourse.name ?? baseCourse.course?.name, char),
  date: blankToChar(
    periodToString(baseCourse?.schedules ?? baseCourse.course?.schedules ?? []),
    char
  ),
  credit: (baseCourse.credit ?? baseCourse.course?.credit ?? 0).toFixed(1),
  instructor: blankToChar(
    baseCourse.instructor ?? baseCourse.course?.instructor,
    char
  ),
  room: blankToChar(
    Array.from(
      new Set(
        (baseCourse?.schedules ?? baseCourse.course?.schedules ?? []).map(
          (s) => s.room
        )
      )
    ).join(", "),
    char
  ),
  method: blankToChar(
    (baseCourse.methods ?? baseCourse.course?.methods ?? [])
      .map(methodToJa)
      .join(", "),
    char
  ),
  attendance: baseCourse.attendance,
  absence: baseCourse.absence,
  late: baseCourse.late,
  memo: baseCourse.memo,
  schedules: apiToSchedule(
    baseCourse.schedules ?? baseCourse.course?.schedules ?? []
  ),
  methods: (baseCourse.methods ?? baseCourse.course?.methods ?? []).map(
    methodToJa
  ),
});

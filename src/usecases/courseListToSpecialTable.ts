import { RegisteredCourse } from "~/api/@types";
import { SpecialDay, specialDays } from "~/entities/day";
import {
  createSpecialCourseStateList,
  SpecialCourseState,
  SpecialTable,
  Table,
} from "~/entities/table";

/**
 * ホーム画面の特殊授業のテーブルを作成する。
 */
export const courseListToSpecialTable = (
  courses: RegisteredCourse[]
): SpecialTable => {
  const targetCourses = courses.reduce<
    { [key in SpecialDay | "Weekend"]: RegisteredCourse[] }
  >(
    (acc, course) => {
      const schedules = course.schedules ?? course.course?.schedules ?? [];
      [
        ...new Set(
          schedules
            .map((s) => s.day)
            .filter((day) => [...specialDays, "Sat", "Sun"].includes(day))
        ),
      ].forEach((day) => {
        acc[day === "Sat" || day === "Sun" ? "Weekend" : day].push(course);
      });

      return acc;
    },
    {
      Intensive: [],
      Appointment: [],
      AnyTime: [],
      Weekend: [],
    }
  );

  return [...specialDays, "Weekend"].reduce<SpecialTable>(
    (st, day) => {
      st[day] = createSpecialCourseStateList(
        targetCourses[day],
        day === "Weekend" ? ["Sat", "Sun"] : [day as SpecialDay]
      );
      return st;
    },
    {
      Intensive: [],
      Appointment: [],
      AnyTime: [],
      Weekend: [],
    }
  );
};

export const getUndisplayedCourses = (
  courses: RegisteredCourse[],
  table: Table,
  specialTable: SpecialTable
): SpecialCourseState[] => {
  const displayedCourseIdSet = new Set(
    table
      .flat(2)
      .map((c) => c.courseId)
      .concat(
        [
          ...specialTable.Intensive,
          ...specialTable.Appointment,
          ...specialTable.AnyTime,
          ...specialTable.Weekend,
        ].map((c) => c.id)
      )
  );
  const undisplayedCourses = courses.filter(
    (c) => !displayedCourseIdSet.has(c.id)
  );

  return createSpecialCourseStateList(undisplayedCourses);
};

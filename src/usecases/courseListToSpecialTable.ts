import { CourseSchedule, RegisteredCourse } from "~/api/@types";
import {
  fullDays,
  isSpecialDay,
  SpecialDay,
  specialDays,
} from "~/entities/day";
import { modules } from "~/entities/module";
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
  const targetCourses = courses.reduce<Record<SpecialDay, RegisteredCourse[]>>(
    (targetCourses, course) => {
      const schedules = course.schedules ?? course.course?.schedules ?? [];
      schedules
        .filter((schedule): schedule is CourseSchedule & { day: SpecialDay } =>
          isSpecialDay(schedule.day)
        )
        .forEach((schedule) => {
          targetCourses[schedule.day].push(course);
        });
      return targetCourses;
    },
    {
      Intensive: [],
      Appointment: [],
      AnyTime: [],
    }
  );

  return specialDays.reduce<SpecialTable>(
    (specialTable, day) => {
      specialTable[day] = createSpecialCourseStateList(targetCourses[day], [
        day,
      ]);
      return specialTable;
    },
    {
      Intensive: [],
      Appointment: [],
      AnyTime: [],
    }
  );
};

/**
 * 画面に表示されていない講義を抽出し、SpecialCourseStateに変換する
 */
export const getUndisplayedCourses = (
  courses: RegisteredCourse[],
  table: Table,
  specialTable: SpecialTable
): SpecialCourseState[] => {
  const displayedCourseIdSet = new Set(
    modules
      .reduce<string[]>((idList, m) => {
        return idList.concat(table[m].flat(2).map((c) => c.id));
      }, [])
      .concat(
        specialDays.reduce<string[]>((idList, d) => {
          return idList.concat(specialTable[d].map((c) => c.id));
        }, [])
      )
  );

  const undisplayedCourses = courses.filter(
    (c) => !displayedCourseIdSet.has(c.id)
  );

  return createSpecialCourseStateList(
    undisplayedCourses,
    [...fullDays, "Unknown"],
    false
  );
};

import { CourseSchedule, RegisteredCourse } from "~/api/@types";
import {
  courseModulesNum,
  ModuleFlg,
  moduleFlgToDisplay,
} from "~/entities/module";
import { SaturdayCourse } from "~/entities/table";

export const getSaturdayCourseList = (
  courses: RegisteredCourse[]
): SaturdayCourse[] => {
  const unsortedSaturdayCourseList = courses.reduce<
    { moduleFlg: ModuleFlg; name: string; room: string; id: string }[]
  >((acc, course) => {
    const schedules: CourseSchedule[] =
      course.schedules ?? course.course?.schedules ?? [];
    const moduleFlg = schedules.reduce<ModuleFlg>(
      (moduleFlg, schedule) => {
        if (schedule.day !== "Sat") return moduleFlg;
        moduleFlg[courseModulesNum(schedule.module)] = true;
        return moduleFlg;
      },
      [false, false, false, false, false, false, false, false, false]
    );
    if (!moduleFlg.some((f) => f)) return acc;
    const name = course.name ?? course.course?.name ?? "";
    const room = [...new Set(schedules.map((s) => s.room))].join(",");
    acc.push({ moduleFlg, name, room, id: course.id });
    return acc;
  }, []);

  // 比較する インデックス より前に同じ要素が存在するのか (hasSame) で大小関係が異なる
  // [T, F ...] < [F, T ...]
  // [T, F ...] > [T, T ...]
  unsortedSaturdayCourseList.sort((prev, next) => {
    let hasSame = false;
    for (let i = 0; i < 9; i++) {
      if (prev.moduleFlg[i] && next.moduleFlg[i]) hasSame = true;
      if (prev.moduleFlg[i] === next.moduleFlg[i]) continue;
      const ans = Number(prev.moduleFlg[i]) - Number(next.moduleFlg[i]);
      return hasSame ? ans : -ans;
    }
    return prev.name <= next.name ? -1 : 1;
  });

  return unsortedSaturdayCourseList.map<SaturdayCourse>((c) => ({
    module: moduleFlgToDisplay(c.moduleFlg),
    name: c.name,
    room: c.room,
    id: c.id,
  }));
};

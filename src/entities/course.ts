import { Schedules } from "~/components/ScheduleEditer.vue";
import { CourseSchedule, RegisteredCourseWithoutID } from "~/api/@types";
import { jaToModule } from "~/entities/module";
import { jaToDay } from "~/entities/day";

export const getInitCourse = (): Required<RegisteredCourseWithoutID> => ({
  absence: 0,
  attendance: 0,
  credit: 0,
  instructor: "",
  late: 0,
  memo: "",
  methods: [],
  name: "",
  schedules: [],
  tags: [],
  year: 0,
});

/**
 * 日本語の学期名などを api の形式に合うようにフォーマットする
 */
export const formatSchedule = (schedule: Schedules): CourseSchedule[] => {
  return schedule.map((v) => ({
    module: jaToModule(v.module),
    day: jaToDay(v.date),
    period: Number(v.period),
    room: "",
  }));
};

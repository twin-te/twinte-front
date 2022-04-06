import { Course, CourseSchedule } from "~/api/@types";
import { periodToString } from "~/usecases/periodToString";

export type CourseCard = {
  id: string;
  name: string;
  period: string;
  location: string;
  url: string;
  isSelected: boolean;
};

/**
 * roomを文字形式(ex 6A203, オンライン)に変換する関数
 */
export const locationToString = (_schedules: CourseSchedule[]) => {
  const rooms = new Set(_schedules.map((schedule) => schedule.room));
  return [...rooms].join(", ");
};

export const getSyllbusUrl = (code: string, year: number) => {
  return `https://kdb.tsukuba.ac.jp/syllabi/${year}/${code}/jpn/`;
};

export const courseToCard = (course: Course, isSelect = false): CourseCard => {
  const courseCard: CourseCard = {
    id: course.code,
    name: course.name,
    period: periodToString(course.schedules),
    location: locationToString(course.schedules),
    url: getSyllbusUrl(course.code, course.year),
    isSelected: isSelect,
  };
  return courseCard;
};

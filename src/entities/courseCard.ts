import { Course, CourseSchedule } from "~/api/@types";
import { periodToString } from "~/usecases/periodToString";
import { methodToJa } from "~/entities/method";

export type CourseCard = {
  id: string;
  name: string;
  period: string;
  location: string;
  credit: number;
  instructor: string;
  overview: string;
  methods: string;
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

export const courseToCard = (
  course: Course,
  isSelect: boolean = false
): CourseCard => {
  const courseCard: CourseCard = {
    id: course.code,
    name: course.name,
    period: periodToString(course.schedules),
    location: locationToString(course.schedules),
    credit: course.credit,
    instructor: course.instructor,
    overview: course.overview,
    methods: course.methods.map(methodToJa).join(", "),
    url: getSyllbusUrl(course.code, course.year),
    isSelected: isSelect,
  };
  return courseCard;
};

import { Course, CourseSchedule } from "~/api/@types";

export type CourseCard = {
  id: string;
  name: string;
  period: string;
  location: string;
  url: string;
  isSelected: boolean;
};

/**
 * periodを文字形式(ex 秋AB火12)に変換する関数
 */
export const periodToString = (_schedules: CourseSchedule[]) => {
  return "秋AB 火12";
};

/**
 * roomを文字形式(ex 6A203, オンライン)に変換する関数
 */
export const locationToString = (_schedules: CourseSchedule[]) => {
  return "6A203";
};

export const getSyllbUrl = (courseId: string) => {
  return `https://kdb.tsukuba.ac.jp/syllabi/2021/${courseId}/jpn/0`;
};

export const courseToCard = (course: Course): CourseCard => {
  const courseCard: CourseCard = {
    id: course.id,
    name: course.name,
    period: periodToString(course.schedules),
    location: locationToString(course.schedules),
    url: getSyllbUrl(course.id),
    isSelected: false,
  };
  return courseCard;
};

const dummySearchResult: Course[] = [
  {
    id: "01EB512",
    year: 2021,
    code: "xxxxxxxx",
    name: "色彩計画論特講色彩計画論特講色彩...",
    instructor: "",
    credit: 1,
    overview: "xxxxxxxx",
    remarks: "xxxxxxxx",
    recommendedGrades: [1, 2, 3, 4],
    methods: ["FaceToFace", "Synchronous"],
    schedules: [{ module: "SpringA", day: "Mon", period: 1, room: "6A203" }],
  },
  {
    id: "01EB512",
    year: 2021,
    code: "xxxxxxxx",
    name: "色彩計画論特講色彩計画論特講色彩...",
    instructor: "",
    credit: 1,
    overview: "xxxxxxxx",
    remarks: "xxxxxxxx",
    recommendedGrades: [1, 2, 3, 4],
    methods: ["FaceToFace", "Synchronous"],
    schedules: [{ module: "SpringA", day: "Mon", period: 1, room: "6A203" }],
  },
  {
    id: "01EB512",
    year: 2021,
    code: "xxxxxxxx",
    name: "色彩計画論特講色彩計画論特講色彩...",
    instructor: "",
    credit: 1,
    overview: "xxxxxxxx",
    remarks: "xxxxxxxx",
    recommendedGrades: [1, 2, 3, 4],
    methods: ["FaceToFace", "Synchronous"],
    schedules: [{ module: "SpringA", day: "Mon", period: 1, room: "6A203" }],
  },
  {
    id: "01EB512",
    year: 2021,
    code: "xxxxxxxx",
    name: "色彩計画論特講色彩計画論特講色彩...",
    instructor: "",
    credit: 1,
    overview: "xxxxxxxx",
    remarks: "xxxxxxxx",
    recommendedGrades: [1, 2, 3, 4],
    methods: ["FaceToFace", "Synchronous"],
    schedules: [{ module: "SpringA", day: "Mon", period: 1, room: "6A203" }],
  },
  {
    id: "01EB512",
    year: 2021,
    code: "xxxxxxxx",
    name: "色彩計画論特講色彩計画論特講色彩...",
    instructor: "",
    credit: 1,
    overview: "xxxxxxxx",
    remarks: "xxxxxxxx",
    recommendedGrades: [1, 2, 3, 4],
    methods: ["FaceToFace", "Synchronous"],
    schedules: [{ module: "SpringA", day: "Mon", period: 1, room: "6A203" }],
  },
  {
    id: "01EB512",
    year: 2021,
    code: "xxxxxxxx",
    name: "色彩計画論特講色彩計画論特講色彩...",
    instructor: "",
    credit: 1,
    overview: "xxxxxxxx",
    remarks: "xxxxxxxx",
    recommendedGrades: [1, 2, 3, 4],
    methods: ["FaceToFace", "Synchronous"],
    schedules: [{ module: "SpringA", day: "Mon", period: 1, room: "6A203" }],
  },
];

export const dummyCourseCard: CourseCard[] = dummySearchResult.map((v) =>
  courseToCard(v)
);

import { Dayjs } from "dayjs";

export type Module =
  | "SpringA"
  | "SpringB"
  | "SpringC"
  | "SummerVacation"
  | "FallA"
  | "FallB"
  | "FallC"
  | "SpringVacation";

export type WeekDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

export type WeekEndDay = "Sun";

export type NormalDay = WeekDay | WeekEndDay;

export type SpecialDay = "Intensive" | "Appointment" | "AnyTime";

export type Day = NormalDay | SpecialDay;

export type Period = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type NormalSchedule = {
  module: Module;
  day: NormalDay;
  period: Period;
  rooms: string[];
};

export type SpecialSchedule = {
  module: Module;
  day: SpecialDay;
  period?: Period; // 特殊授業は時限が指定されていない授業もある
  rooms: string[];
};

export type Schedule = NormalSchedule | SpecialSchedule;

export type Method = "FaceToFace" | "Synchronous" | "Asynchronous" | "Others";

export type Tag = {
  id: string;
  name: string;
  order: number;
};

export type Course = {
  id: string;
  year: number;
  code: string;
  name: string;
  instructors: string[];
  credit: number;
  overview: string;
  remarks: string;
  recommendedGrades: number[];
  methods: Method[];
  schedules: Schedule[];
};

export type RegisteredCourse = {
  id: string;
  year: string;
  code?: string; // 手動で追加した授業の場合は null
  name: string;
  instructors: string[];
  credit: number;
  methods: Method[];
  schedules: Schedule[];
  memo: string;
  attendance: number;
  absence: number;
  late: number;
  tags: Tag[];
};

export type User = {
  id: string;
  name: string;
};

export type Setting = {
  darkMode: boolean;
  displaySaturdayCourseMode: boolean; // 時間割に土曜授業を表示するかどうか
  displayNightPeriodMode: boolean; // 7,8限を表示するかどうか
  displayTimeLabelMode: boolean; // 時間割に開始・終了時刻を表示するかどうか
  displayYear: number; // ホーム画面で表示する授業の年度
};

export type SchoolCalendarModule = {
  year: number;
  module: Module;
  start: Dayjs;
  end: Dayjs;
};

// 保留
export type SchoolCalendarEvent = {
  date: Dayjs;
  name: string;
};

export type News = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  read: boolean;
};

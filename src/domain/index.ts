import { Dayjs } from "dayjs";

export type BaseModule =
  | "SpringA"
  | "SpringB"
  | "SpringC"
  | "FallA"
  | "FallB"
  | "FallC";

export type VacationModule = "SummerVacation" | "SpringVacation";

export type Module = BaseModule | VacationModule;

export type WeekDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

export type WeekEndDay = "Sun";

export type NormalDay = WeekDay | WeekEndDay;

export type SpecialDay = "Intensive" | "Appointment" | "AnyTime";

export type Day = NormalDay | SpecialDay;

export type Period = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

export type NormalSchedule = {
  module: Module;
  day: NormalDay;
  period: Period;
};

export type SpecialSchedule = {
  module: Module;
  day: SpecialDay;
};

export type Schedule = NormalSchedule | SpecialSchedule;

export type NormalTimetable<M extends Module, V> = Record<
  M,
  Record<NormalDay, Record<Period, V>>
>;

export type SpecialTimetable<M extends Module, V> = Record<
  M,
  Record<SpecialDay, V>
>;

export type Timetable<M extends Module, V> = {
  normal: NormalTimetable<M, V>;
  special: SpecialTimetable<M, V>;
};

export type Room = {
  name: string;
  schedules: Schedule[];
};

/**
 * "Cover" means that schedules of target courses must be fully contained in specified schedules.
 * "Contain" means that schedules of target courses must be partially contained in specified schedules.
 */
export type ScheduleMode = "Cover" | "Contain";

export type Method = "FaceToFace" | "Synchronous" | "Asynchronous" | "Others";

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
  rooms: Room[];
};

export type RegisteredCourse = {
  id: string;
  year: string;
  code?: string; // If the course is custome, set to null;
  name: string;
  instructors: string[];
  credit: number;
  methods: Method[];
  schedules: Schedule[];
  rooms: Room[];
  memo: string;
  attendance: number;
  absence: number;
  late: number;
  tagIds: string[];
};

export type Tag = {
  id: string;
  name: string;
  order: number; // 0-indices
};

export type User = {
  id: string;
  name: string;
  setting: Setting;
};

export type Setting = {
  darkMode: boolean;
  displaySaturdayCourseMode: boolean; // Whether to show Saturday classes in the timetable.
  displayNightPeriodMode: boolean; // Whether to show 7 and 8 periods.
  displayTimeLabelMode: boolean; // Whether to show the start and end time in the timetable.
  displayYear: number; // Year used for course display and search. 0 means current year.
};

export type NormalEvent = {
  date: Dayjs;
  eventType: "PublicHoliday" | "Holiday" | "Exam" | "Other";
  description: string;
};

export type SubstituteEvent = {
  date: Dayjs;
  eventType: "SubstituteDay";
  description: string;
  changeTo: NormalDay;
};

export type Event = NormalEvent | SubstituteEvent;

export type ModuleInformation = {
  year: number;
  module: Module;
  startDate: Dayjs;
  endDate: Dayjs;
};

export type News = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  read: boolean;
};

export type Provider = "google" | "apple" | "twitter";

export type FeedbackType = "Bug" | "NewFeature" | "Contact" | "Other";

export type Feedback = {
  type: FeedbackType;
  screenShots: File[];
  content: string;
  email: string;
};

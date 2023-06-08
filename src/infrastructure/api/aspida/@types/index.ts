/* eslint-disable */
export type CourseMethod =
  | "FaceToFace"
  | "Synchronous"
  | "Asynchronous"
  | "Others";

export type CourseModule =
  | "SpringA"
  | "SpringB"
  | "SpringC"
  | "SummerVacation"
  | "FallA"
  | "FallB"
  | "FallC"
  | "SpringVacation"
  | "Unknown";

export type CourseSchedule = {
  module: CourseModule;
  day: CourseDay;
  period: number;
  room: string;
};

export type CourseDay =
  | "Sun"
  | "Mon"
  | "Tue"
  | "Wed"
  | "Thu"
  | "Fri"
  | "Sat"
  | "Intensive"
  | "Appointment"
  | "AnyTime"
  | "Unknown";

export type SchoolCalendarEvent = {
  date: string;
  eventType: "PublicHoliday" | "Holiday" | "Exam" | "SubstituteDay" | "Other";
  description: string;
  changeTo?: CourseDay | undefined;
};

export type SchoolCalendarModule = {
  /** 年度 */
  year: number;
  module:
    | "SpringA"
    | "SpringB"
    | "SpringC"
    | "SummerVacation"
    | "FallA"
    | "FallB"
    | "FallC"
    | "SpringVacation";
  start: string;
  end: string;
};

export type Course = {
  id: string;
  year: number;
  code: string;
  name: string;
  instructor: string;
  credit: number;
  overview: string;
  remarks: string;
  recommendedGrades: number[];
  methods: CourseMethod[];
  schedules: CourseSchedule[];
  isAnnual: boolean;
  hasParseError: boolean;
};

export type RegisteredCourse = {
  id: string;
  userId: string;
  course?: Course | undefined;
} & RegisteredCourseWithoutID;

export type SearchCourseTimetableQuery = {
  SpringA?: SearchCourseTimetableQueryDays | undefined;
  SpringB?: SearchCourseTimetableQueryDays | undefined;
  SpringC?: SearchCourseTimetableQueryDays | undefined;
  FallA?: SearchCourseTimetableQueryDays | undefined;
  FallB?: SearchCourseTimetableQueryDays | undefined;
  FallC?: SearchCourseTimetableQueryDays | undefined;
  SummerVacation?: SearchCourseTimetableQueryDays | undefined;
  SpringVacation?: SearchCourseTimetableQueryDays | undefined;
};

export type SearchCourseTimetableQueryDays = {
  Sun?: SearchCourseTimetableQueryPeriods | undefined;
  Mon?: SearchCourseTimetableQueryPeriods | undefined;
  Tue?: SearchCourseTimetableQueryPeriods | undefined;
  Wed?: SearchCourseTimetableQueryPeriods | undefined;
  Thu?: SearchCourseTimetableQueryPeriods | undefined;
  Fri?: SearchCourseTimetableQueryPeriods | undefined;
  Sat?: SearchCourseTimetableQueryPeriods | undefined;
  Intensive?: SearchCourseTimetableQueryPeriods | undefined;
  Appointment?: SearchCourseTimetableQueryPeriods | undefined;
  AnyTime?: SearchCourseTimetableQueryPeriods | undefined;
};

/** 指定しなかった場合はfalseとみなされます */
export type SearchCourseTimetableQueryPeriods = {
  /** 時限が不明な授業は0になっているためそれらも検索したい場合はtrueに（集中授業に多い） */
  "0"?: boolean | undefined;
  "1"?: boolean | undefined;
  "2"?: boolean | undefined;
  "3"?: boolean | undefined;
  "4"?: boolean | undefined;
  "5"?: boolean | undefined;
  "6"?: boolean | undefined;
  "7"?: boolean | undefined;
  "8"?: boolean | undefined;
};

export type RegisteredCourseWithoutID = {
  year: number;
  name?: string | undefined;
  instructor?: string | undefined;
  credit?: number | undefined;
  methods?: CourseMethod[] | undefined;
  schedules?: CourseSchedule[] | undefined;
  memo: string;
  attendance: number;
  absence: number;
  late: number;
  tags: TagIdOnly[];
};

export type Tag = {
  id: string;
  userId: string;
  name: string;
  position?: number | undefined;
};

export type TagPositionOnly = {
  id: string;
  position: number;
};

export type TagIdOnly = {
  id: string;
};

export type User = {
  id: string;
  name: string;
};

export type Payment = {
  id: string;
  type: "OneTime" | "Subscription";
  status: "Succeeded" | "Canceled" | "Pending";
  amount: number;
  created: string;
};

export type Subscription = {
  id: string;
  status: "Active" | "Canceled";
  plans: {
    id: string;
    name: string;
    amount: number;
  }[];
  created: string;
};

export type PaymentUser = {
  paymentUserId: string;
  twinteUserId: string;
  displayName?: string | undefined;
  link?: string | undefined;
};

export type Information = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  read?: boolean | undefined;
};

export type Error = {
  message: string;
};

export type BadRequestError = Error;

export type UnauthorizedError = Error;

export type NotFoundError = Error;

export type InternalServerError = Error;

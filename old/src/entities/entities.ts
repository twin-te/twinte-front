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

export type Period = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

export type NormalSchedule = {
  module: Module;
  day: NormalDay;
  period: Period;
  room: string;
};

export type SpecialSchedule = {
  module: Module;
  day: SpecialDay;
  period?: Period; // 特殊授業は時限が指定されていない授業もある
  room: string;
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
  instructor: string;
  credit: string;
  overview: string;
  remarks: string;
  recommendedGrades: number[];
  methods: Method[];
  schedules: Schedule[];
};

export type RegisteredCourse = {
  id: string;
  year: string;
  code?: string; // 手動で追加した授業の場合は `null`
  name: string;
  instructor: string;
  credit: string;
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

export type SchoolCalendarModule = {
  year: number;
  module: Module;
  start: Dayjs;
  end: Dayjs;
};

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

export class BaseError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
    /**
     * @warn 出力ターゲットがES2015より古い場合以下が必要
     */
    // Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * レスポンスが返ってこないときなどに使用
 */
export class NetworkError extends BaseError {
  constructor(e?: string) {
    super(e);
    this.message = "ネットワークエラー。通信状況をご確認下さい。";
  }
}

export type OriginalResponse = {
  data: {
    message: string;
    errors: object[];
  };
  status: number;
  statusText: string;
  headers: any;
};

/**
 * 2xx以外のレスポンス時に使用
 */
export class NetworkAccessError extends BaseError {
  status: number;
  constructor(public originalResponse: OriginalResponse, e?: string) {
    super(e);
    this.status = originalResponse.status;
    // 「6 ALREADY_EXISTS: xxxx」とサーバからエラーメッセージが返されるので
    // 見せなくても良い箇所を削除する
    this.message =
      originalResponse.data.message.replace(/.*?:/g, "") ??
      "サーバエラーが発生しました。";
  }
}

export const isErrorObj = (x: unknown): x is Error => {
  if (x == null || typeof x !== "object") return false;
  // x が null ではない object の場合は任意の文字列でプロパティアクセスしても
  // ランタイムエラーは発生しないので Record<string, unknown> と見なせる
  const record = x as Record<string, unknown>;
  return typeof record.name === "string" && typeof record.message === "string";
};

export const extractMessageOrDefault = (error: unknown) =>
  isErrorObj(error) ? error.message : "エラーが発生しました。";

export type Result<T = unknown, E = Error> = Ok<T, E> | Err<T, E>;

export class Ok<T, E> {
  constructor(readonly value: T) {}
  type = "Ok" as const;
  isOk(): this is Ok<T, E> {
    return true;
  }
  isErr(): this is Err<T, E> {
    return false;
  }
}

export class Err<T, E> {
  constructor(readonly value: E) {}
  type = "Err" as const;
  isOk(): this is Ok<T, E> {
    return false;
  }
  isErr(): this is Err<T, E> {
    return true;
  }
}

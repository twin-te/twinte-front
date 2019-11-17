import { Module, Day } from "./parser";
import { Lecture as _Lecture } from "./parser";

// https://github.com/twin-te/twinte-server/blob/working-clean/src/domain/entities/user.ts

/**
 * 出欠などの個人データ構造
 */
export interface UserData {
  year: number;
  lectureID: string;

  memo: string;
  attendance: number;
  absence: number;
  late: number;
}

/**
 * 授業データ構造
 */
export interface Period {
  year: number;
  module: Module;

  day: Day;
  period: number;
  room: string;

  lectureID: string;
  name: string;
  instructor: string;
}

/**
 * ログイン時のデータ構造
 */
export interface User {
  twitter: {
    id: string;
    displayName: string;
    username?: string;
    photos?: {
      value: string;
    }[];
  };

  timetables: Period[];
  userData: UserData[];
}

// https://github.com/twin-te/twinte-server/blob/working-clean/src/domain/entities/lecture.ts

export interface Lecture extends _Lecture {
  year: number;
}

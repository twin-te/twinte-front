import { MethodJa } from "./method";
import { Schedule } from "~/entities/schedule";

export type DisplayCourse = {
  code: string; // 科目コード
  name: string; // 授業名
  date: string; // 開講時限
  credit: string; // 単位数
  instructor: string; // 担当教員
  room: string; // 授業場所
  method: string; // 授業形式
  memo: string; // メモ
  attendance: number; // 出席
  absence: number; // 欠席
  late: number; // 遅刻
  schedules: Schedule[]; // スケジュールの編集用
  methods: MethodJa[]; // 授業形式の編集用
};

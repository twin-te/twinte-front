// https://github.com/twin-te/twinte-server/blob/working-clean/src/domain/entities/user.ts

/**
 * 出欠などのユーザーデータ構造
 * カスタム時間割にはtwinte_lecture_idは存在しない
 * @post /user-lectures/
 * @get /user-lectures/{user_lecture_id}
 * @put /user-lectures/{user_lecture_id}
 * @post /timetables/
 */
export interface UserLectureEntity {
  twinte_lecture_id?: string;
  user_lecture_id: string;
  attendance: number;
  absence: number;
  late: number;
  memo: string;
  lecture_name: string;
  instructor: string;
}

/**
 * 授業データ構造
 * @get /timetables/
 * @get /timetables/{year}/{module}/{day}/{period}
 * @post /timetables​/{year}​/{module}​/{day}​/{period}
 */
export interface OutputPeriodData {
  lecture_code: string;
  lecture_name: string;
  instructor: string;
  year: number;
  module: string;
  day: string;
  period: number;
  room: string;
  user_lecture_id: string;
}

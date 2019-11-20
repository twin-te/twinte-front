import { Period } from "../../types";
import { BASE_URL, axios } from "./config";
const url = BASE_URL + "/timetables";

export enum Module {
  SpringA = "春A",
  SpringB = "春B",
  SpringC = "春C",
  FallA = "秋A",
  FallB = "秋B",
  FallC = "秋C",
  SummerVacation = "夏季休業中",
  SpringVacation = "春季休業中",
  Annual = "通年",
  Unknown = "不明"
}

export enum Day {
  Sun = "日",
  Mon = "月",
  Tue = "火",
  Wed = "水",
  Thu = "木",
  Fri = "金",
  Sat = "土",
  Unknown = "不明"
}

/**
 * 今日の時間割を取得
 */
async function getToday() {
  try {
    const { data } = await axios.get<Period[]>(`${url}/today`);
    return data;
  } catch (error) {
    console.log(
      `Error! HTTP Status: ${error.response.status} ${error.response.statusText}`
    );
    return [];
  }
}

/**
 * 特定の学期の時間割取得
 * @param module
 * @param year
 */
async function getTable(module: Module, year: number) {
  try {
    const { data } = await axios.get<Period[]>(`${url}/${year}/${module}`);
    return data;
  } catch (error) {
    console.log(
      `Error! HTTP Status: ${error.response.status} ${error.response.statusText}`
    );
    return [];
  }
}

/**
 * 全学期の時間割取得
 * @param year
 */
async function getTableAll(year: number) {
  try {
    const { data } = await axios.get<Period[]>(`${url}/${year}`);
    return data;
  } catch (error) {
    console.log(
      `Error! HTTP Status: ${error.response.status} ${error.response.statusText}`
    );
    return [];
  }
}

/**
 * 講義を時間割に登録
 * @param lectureID
 * @param year
 */
async function postLecture(lectureID: string, year: number) {
  try {
    const { data } = await axios.post<string>(`${url}/${year}`, {
      lectureID
    });
    return data;
  } catch (error) {
    console.log(
      `Error! HTTP Status: ${error.response.status} ${error.response.statusText}`
    );
    return "error";
  }
}

/** 作成するときの任意の時間割情報 */
interface CustomLecture {
  lectureID: string;
  name: string;
  instructor: string;
  room: string;
}

/**
 * 講義の作成/更新
 * @param year
 * @param module
 * @param day
 * @param period
 * @param body
 * {
 *   lectureID: string
 *   name: string
 *   instructor: string
 *   room: string
 * }
 */
async function createLecture(
  year: number,
  module: Module,
  day: Day,
  period: number,
  body: CustomLecture
) {
  try {
    const { data } = await axios.put(
      `${url}/${year}/${module}/${day}/${period}`,
      {
        lectureID: body.lectureID,
        name: body.name,
        instructor: body.instructor,
        room: body.room
      }
    );
    return data;
  } catch (error) {
    console.log(
      `Error! HTTP Status: ${error.response.status} ${error.response.statusText}`
    );
    return null;
  }
}

/**
 * 講義の削除
 * @param year
 * @param module
 * @param day
 * @param period
 */
async function deleteLecture(
  year: number,
  module: Module,
  day: Day,
  period: number
) {
  try {
    const { data } = await axios.delete(
      `${url}/${year}/${module}/${day}/${period}`
    );
    return data;
  } catch (error) {
    console.log(
      `Error! HTTP Status: ${error.response.status} ${error.response.statusText}`
    );
    return null;
  }
}

/** サーバー側の時間割のリセット WIP */
async function reset(year: number = 2019) {
  const moduleList = [
    Module.SpringA,
    Module.SpringB,
    Module.SpringC,
    Module.FallA,
    Module.FallB,
    Module.FallC
  ];
  const dayList = [Day.Mon, Day.Tue, Day.Wed, Day.Thu, Day.Fri];
  for (let module = 0; module < moduleList.length; module++) {
    for (let day = 0; day < dayList.length; day++) {
      for (let period = 0; period < 6; period++) {
        await deleteLecture(year, moduleList[module], dayList[day], period);
      }
    }
  }
}

export {
  getToday,
  getTable,
  getTableAll,
  postLecture,
  createLecture,
  deleteLecture,
  reset
};

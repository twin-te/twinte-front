export interface Table {
  classroom: string;
  name: string;
  number: string;
  season: string;
  teacher: string;
  time: string;
  attend: number;
  absent: number;
  late: number;
  memo: string;
}
export type ResponseData = Table[][];

// state______________________________________________________
//
export interface S {
  data: Table[][][] | null;
  list_number: string[][];
  moduleList: string[];
}
// getters______________________________________________________
//
export interface G {
  data: Table[][][] | null;
  list_number: string[][] | null;
  isLogin: boolean;
}
export interface RG {
  "old_api/data": G["data"];
  "old_api/list_number": G["list_number"];
  "old_api/isLogin": G["isLogin"];
}
// mutations______________________________________________________
//
export interface M {
  /**
   * 時間割の上書き更新
   * @param payload module: 更新する学期 "haruA", data: その学期の時間割情報すべて
   */
  updateTable: { module: string; data: Table[][] };
  updateTableAll: { data: Table[][][] | null };
  /**
   * 授業番号のリストに重複なく追加+nullチェック
   * @param payload module: 追加する学期 ex) "haruA", data: 授業番号
   */
  SET_NUMBER: { module: string; data: string[] };
  /**
   * すべての学期の授業番号を変更するため`data`配列は[module][number配列]の形にする
   */
  SET_NUMBERS: { data: string[][] | null };
}
export interface RM {
  "old_api/updateTable": M["updateTable"];
  "old_api/SET_NUMBER": M["SET_NUMBER"];
  "old_api/updateTableAll": M["updateTableAll"];
  "old_api/SET_NUMBERS": M["SET_NUMBERS"];
}
// actions______________________________________________________
//
export interface A {
  /**
   * 番号での追加
   * @param module api基準 "haruA"
   */
  asyncNumber: { number: string[]; module: string };
  /**
   * CSVでの追加
   * @param module api基準 "haruA"
   */
  asyncCSV: { formData: any; config: any; module: string };
  /**
   * moduleNum学期に
   * attend: 0, absent: 0, memo: '' を追加
   */
  assignObj: { moduleNum: number };
  /**
   * 授業リストの作成
   */
  createNumbers: null;
  login: null;
  logout: null;
}
export interface RA {
  "old_api/asyncNumber": A["asyncNumber"];
  "old_api/asyncCSV": A["asyncCSV"];
  "old_api/assignObj": A["assignObj"];
  "old_api/createNumbers": A["createNumbers"];
  "old_api/login": A["login"];
  "old_api/logout": A["logout"];
}

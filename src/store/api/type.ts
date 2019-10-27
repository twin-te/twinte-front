export interface Table {
  classroom: string;
  name: string;
  number: string;
  season: string;
  teacher: string;
  time: string;
  attend: number | null;
  absent: number | null;
  late: number | null;
  memo: string | null;
}
export type ResponseData = Table[][];

// state______________________________________________________
//
export interface S {
  data: Table[][][] | null;
  list_number: string[][];
  moduleList: string[];
  isLogin: boolean;
}
// getters______________________________________________________
//
export interface G {
  data: Table[][][] | null;
  list_number: string[][] | null;
  isLogin: boolean;
}
export interface RG {
  "api/data": G["data"];
  "api/list_number": G["list_number"];
  "api/isLogin": G["isLogin"];
}
// mutations______________________________________________________
//
export interface M {
  /**
   * 時間割の上書き更新
   * @param payload module: 更新する学期 "春A", data: その学期の時間割情報すべて
   */
  UPDATE_TABLE: { module: string; data: Table[][] };
  UPDATE_TABLES: { data: Table[][][] | null };
  /**
   * 授業番号のリストに重複なく追加+nullチェック
   * @param payload module: 追加する学期 ex) "春A", data: 授業番号
   */
  SET_NUMBER: { module: string; data: string[] };
  /**
   * すべての学期の授業番号を変更するため`data`配列は[module][number配列]の形にする
   */
  SET_NUMBERS: { data: string[][] | null };
  /**
   * ログインするときに呼ぶ、isLoginがtrueになるだけ
   */
  LOGIN: null;
  /**
   * ログアウトするときに呼ぶ、isLoginがfalseになるだけ
   */
  LOGOUT: null;
}
export interface RM {
  "api/UPDATE_TABLE": M["UPDATE_TABLE"];
  "api/SET_NUMBER": M["SET_NUMBER"];
  "api/UPDATE_TABLES": M["UPDATE_TABLES"];
  "api/SET_NUMBERS": M["SET_NUMBERS"];
  "api/LOGIN": M["LOGIN"];
  "api/LOGOUT": M["LOGOUT"];
}
// actions______________________________________________________
//
export interface A {
  /**
   * 番号での追加
   * @param module api基準 "haruA"
   */
  asyncNumber: { number: string; module: string };
  /**
   * CSVでの追加
   * @param module api基準 "haruA"
   */
  asyncCSV: { fileData: any; module: string };
  /**
   * moduleNum学期に
   * attend: 0, absent: 0, memo: '' を追加
   */
  assignObj: { moduleNum: number };
  /** 授業リストの作成 */
  createNumbers: null;
  login: null;
  logout: null;
}
export interface RA {
  "api/asyncNumber": A["asyncNumber"];
  "api/asyncCSV": A["asyncCSV"];
  "api/assignObj": A["assignObj"];
  "api/createNumbers": A["createNumbers"];
  "api/login": A["login"];
  "api/logout": A["logout"];
}

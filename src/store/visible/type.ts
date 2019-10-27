export interface S {
  drawer: boolean;
  detail: boolean;
  add: boolean;
  table: { display: boolean; move: string };
}
export interface G {
  /**
   * サイドバー
   */
  drawer: boolean;
  /**
   * 詳細
   */
  detail: boolean;
  /**
   * 科目追加
   */
  add: boolean;
  /**
   * 時間割
   */
  table: { display: boolean; move: string };
}
export interface RG {
  "visible/drawer": G["drawer"];
  "visible/detail": G["detail"];
  "visible/add": G["add"];
  "visible/table": G["table"];
}
export interface M {
  /**
   * ナビゲーションバーの表示のon/off
   * @param display bool
   */
  chDrawer: { display: boolean };
  /**
   * 詳細の表示のon/off
   * @param display bool
   */
  chDetail: { display: boolean };
  /**
   * 科目追加の表示のon/off
   * @param display bool
   */
  chAdd: { display: boolean };
  /**
   * 時間割画面の表示のon/off
   * @param display bool
   * @param move "left" "right"
   */
  chTable: { display: boolean; move: string };
}
export interface RM {
  "visible/chDrawer": M["chDrawer"];
  "visible/chDetail": M["chDetail"];
  "visible/chAdd": M["chAdd"];
  "visible/chTable": M["chTable"];
}

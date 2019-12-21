/**
 *
 * # State of Visible #
 *
 * - 表示の切り替えを行うときの状態管理はここで行います。
 * - drawer: 横からでるナビゲーションバー
 * - detail: 詳細画面のポップアップ
 * - add: 追加画面のポップアップ
 * - table: 時間割。アニメーション時に状態を変えます
 *
 */

export interface S {
  drawer: boolean;
  detail: boolean;
  add: boolean;
  table: { display: boolean; move: 'left' | 'right' };
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
   * 時間割 アニメーション実装するため、どちら遷移するかmoveで記述
   */
  table: { display: boolean; move: 'left' | 'right' };
}
export interface RG {
  'visible/drawer': G['drawer'];
  'visible/detail': G['detail'];
  'visible/add': G['add'];
  'visible/table': G['table'];
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
   * @param move "left" "right" アニメーション実装するため、どちら遷移するか記述
   */
  chTable: { display: boolean; move: 'left' | 'right' };
}
export interface RM {
  'visible/chDrawer': M['chDrawer'];
  'visible/chDetail': M['chDetail'];
  'visible/chAdd': M['chAdd'];
  'visible/chTable': M['chTable'];
}

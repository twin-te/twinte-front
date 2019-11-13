import { Module } from '../../types/index'

export { Module }

export interface S {
  moduleList: string[];
  module: string;
  click: { day: number; period: number } | null;
}
export interface G {
  /**
   * 現在の学期を返す
   * @returns Module.SpringA etc...
   */
  module: string;
  /**
   * 前の学期を返す
   */
  prevModule: string;
  /**
   * 次の学期を返す
   */
  nextModule: string;
  /**
   * 現在の学期の配列番号を返す、空の場合は0を返す
   */
  moduleNum: number;
  /**
   * 直前にクリックした授業の座標を保持する
   */
  click: { day: number; period: number };
}
export interface RG {
  "table/module": G["module"];
  "table/prevModule": G["prevModule"];
  "table/nextModule": G["prevModule"];
  "table/moduleNum": G["moduleNum"];
  "table/click": G["click"];
}
export interface M {
  /**
   * @param module "SpringA"
   */
  setModule: { module: string };
  /**
   * @description 前の学期を返す
   * @param state なし
   */
  prevModule: void;
  /**
   * @description 次の学期を返す
   * @param state なし
   */
  nextModule: void;
  /**
   * 直前にクリックした授業の座標を保持する
   * @param day 0 - 4
   * @param period 0 - 5
   */
  setClick: { day: number; period: number };
}
export interface RM {
  "table/setModule": M["setModule"];
  "table/prevModule": M["prevModule"];
  "table/nextModule": M["nextModule"];
  "table/setClick": M["setClick"];
}

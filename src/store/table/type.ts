// state______________________________________________________
//
export interface S {
  moduleList: string[];
  module: string;
  click: { x: number; y: number } | null;
}
// getters______________________________________________________
//
export interface G {
  module: string;
  prevModule: string;
  nextModule: string;
  moduleNum: number;
  click: { x: number; y: number };
}
export interface RG {
  "table/module": G["module"];
  "table/prevModule": G["prevModule"];
  "table/nextModule": G["prevModule"];
  "table/moduleNum": G["moduleNum"];
  "table/click": G["click"];
}
// mutations______________________________________________________
//
export interface M {
  setModule: { module: string };
  prevModule: void;
  nextModule: void;
  setClick: { x: number; y: number };
}
export interface RM {
  "table/setModule": M["setModule"];
  "table/prevModule": M["prevModule"];
  "table/nextModule": M["nextModule"];
  "table/setClick": M["setClick"];
}
// actions______________________________________________________
//
export interface A {}
export interface RA {}

// state______________________________________________________
//
export interface S {
  moduleList: string[];
  module: string;
}
// getters______________________________________________________
//
export interface G {
  module: string;
  prevModule: string;
  nextModule: string;
  moduleNum: number;
}
export interface RG {
  "table/module": G["module"];
  "table/prevModule": G["prevModule"];
  "table/nextModule": G["prevModule"];
  "table/moduleNum": G["moduleNum"];
}
// mutations______________________________________________________
//
export interface M {
  prevModule: void;
  nextModule: void;
}
export interface RM {
  "table/prevModule": M["prevModule"];
  "table/nextModule": M["nextModule"];
}
// actions______________________________________________________
//
export interface A {}
export interface RA {}

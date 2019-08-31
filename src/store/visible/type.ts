// state______________________________________________________
//
export interface S {
  drawer: boolean;
  detail: boolean;
  add: boolean;
  table: { display: boolean; move: string };
}
// getters______________________________________________________
//
export interface G {
  drawer: boolean;
  detail: boolean;
  add: boolean;
  table: { display: boolean; move: string };
}
// 'visible/double': G['double']
export interface RG {
  "visible/drawer": G["drawer"];
  "visible/detail": G["detail"];
  "visible/add": G["add"];
  "visible/table": G["table"];
}
// mutations
//
// setCount: { amount: number }
export interface M {
  chDrawer: { display: boolean };
  chDetail: { display: boolean };
  chAdd: { display: boolean };
  chTable: { display: boolean; move: string };
}
// 'visible/setCount': M['setCount']
export interface RM {
  "visible/chDrawer": M["chDrawer"];
  "visible/chDetail": M["chDetail"];
  "visible/chAdd": M["chAdd"];
  "visible/chTable": M["chTable"];
}
// actions______________________________________________________
//
// asyncSetCount: { amount: number }
export interface A {}
// 'visible/asyncSetCount': A['asyncSetCount']
export interface RA {}

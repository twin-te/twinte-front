// state______________________________________________________
//
export interface S {
  drawer: boolean;
  detail: boolean;
  add: boolean;
}
// getters______________________________________________________
//
export interface G {
  drawer: boolean;
  detail: boolean;
  add: boolean;
}
// 'visible/double': G['double']
export interface RG {
  "visible/drawer": G["drawer"];
  "visible/detail": G["detail"];
  "visible/add": G["add"];
}
// mutations
//
// setCount: { amount: number }
export interface M {
  chDrawer: { bool: boolean };
  chDetail: { bool: boolean };
  chAdd: { bool: boolean };
}
// 'visible/setCount': M['setCount']
export interface RM {
  "visible/chDrawer": M["chDrawer"];
  "visible/chDetail": M["chDetail"];
  "visible/chAdd": M["chAdd"];
}
// actions______________________________________________________
//
// asyncSetCount: { amount: number }
export interface A {}
// 'visible/asyncSetCount': A['asyncSetCount']
export interface RA {}

// state______________________________________________________
//
export interface S {
  drawer: boolean;
  dialog: boolean;
}
// getters______________________________________________________
//
export interface G {
  drawer: boolean;
  dialog: boolean;
}
// 'visible/double': G['double']
export interface RG {
  "visible/drawer": G["drawer"];
  "visible/dialog": G["dialog"];
}
// mutations
//
// setCount: { amount: number }
export interface M {
  chDrawer: { bool: boolean };
  chDialog: { bool: boolean };
}
// 'visible/setCount': M['setCount']
export interface RM {
  "visible/chDrawer": M["chDrawer"];
  "visible/chDialog": M["chDialog"];
}
// actions______________________________________________________
//
// asyncSetCount: { amount: number }
export interface A {}
// 'visible/asyncSetCount': A['asyncSetCount']
export interface RA {}

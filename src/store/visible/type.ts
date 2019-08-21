// state______________________________________________________
//
export interface S {
  drawer: boolean;
}
// getters______________________________________________________
//
export interface G {
  drawer: boolean;
}
// 'visible/double': G['double']
export interface RG {
  "visible/drawer": G["drawer"];
}
// mutations
//
// setCount: { amount: number }
export interface M {
  chDrawer: { bool: boolean | null };
}
// 'visible/setCount': M['setCount']
export interface RM {
  "visible/chDrawer": M["chDrawer"];
}
// actions______________________________________________________
//
// asyncSetCount: { amount: number }
export interface A {}
// 'visible/asyncSetCount': A['asyncSetCount']
export interface RA {}

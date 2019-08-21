interface Table {
  classroom: string;
  name: string;
  number: string;
  season: string;
  teacher: string;
  time: string;
}
[];

// state______________________________________________________
//
export interface S {
  data: Table[];
  list_number: string[][];
}
// getters______________________________________________________
//
export interface G {
  data: Table[] | null;
  list_number: string[][] | null;
}
export interface RG {
  "old_api/data": G["data"];
  "old_api/list_number": G["list_number"];
}
// mutations
//
export interface M {
  updateTable: { module: string, data: Table };
  pushNumber: { module: string, data: string[] };
}
export interface RM {
  "old_api/updateTable": M["updateTable"];
  "old_api/pushNumber": M["pushNumber"];
}
// actions______________________________________________________
//
export interface A {
  asyncNumber: { number: string[], module: string };
}
export interface RA {
  "old_api/asyncNumber": A["asyncNumber"];
}

import { TimeTables, Period } from '../../types/index';
import { UserLectureEntity } from '~/src/types/server';

export interface S {
  timeTables: TimeTables;
  isLogin: boolean;
}

export interface G {
  table: TimeTables;
  isLogin: boolean;
}
export interface RG {
  'api/table': G['table'];
  'api/isLogin': G['isLogin'];
}

export interface M {
  SET_TABLE: { periodDatas: TimeTables };

  LOGIN: null;
  LOGOUT: null;
}
export interface RM {
  'API/SET_TABLE': M['SET_TABLE'];
  'API/LOGIN': M['LOGIN'];
  'API/LOGOUT': M['LOGOUT'];
}

export interface A {
  addTable: { lectureCodes: string[] };
  deleteTable: {
    table: Period;
    UserLecture: UserLectureEntity;
  };
  fetch: null;

  login: null;
  logout: null;
}
export interface RA {
  'api/addTable': A['addTable'];
  'api/deleteTable': A['deleteTable'];
  'api/fetch': A['fetch'];
  'api/login': A['login'];
  'api/logout': A['logout'];
}

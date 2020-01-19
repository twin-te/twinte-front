import './shims-vuex-impl';
import './shims-vuex-type';

// twinte-parser
import { OutputPeriodData } from './server';
import { Day, Module } from './parser';

/** 時間割 */
type TimeTables = OutputPeriodData[];
type Period = OutputPeriodData;

type OutputSearchData = {
  twinte_lecture_id: string;
  year: number;
  lectureCode: string;
  name: string;
  details: {
    id: number;
    module: Module;
    day: Day;
    period: number;
    room: string;
  }[];
  instructor: string;
}[];

type SubjectSettings = {
  lecture_name: boolean;
  lecture_code: boolean;
  instructor: boolean;
  room: boolean;
  font_size: 'small' | 'medium' | 'large';
};

export { Day, Module, TimeTables, Period, OutputSearchData, SubjectSettings };

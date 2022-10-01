/* eslint-disable */
import type * as Types from "../@types";

export type Methods = {
  get: {
    query: {
      year: number;
    };

    status: 200;
    /** 成功 */
    resBody: Types.RegisteredCourse[];
  };

  post: {
    status: 200;

    /** 成功 */
    resBody: Types.RegisteredCourse | Types.RegisteredCourse[];

    reqBody:
      | {
          year: number;
          code: string;
        }
      | {
          year: number;
          code: string;
        }[]
      | {
          year: number;
          name: string;
          instructor: string;
          credit: number;
          methods: Types.CourseMethod[];
          schedules: Types.CourseSchedule[];
          tags: Types.TagIdOnly[];
        };
  };
};

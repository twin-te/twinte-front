/* eslint-disable */
import type * as Types from "../../@types";

export type Methods = {
  get: {
    status: 200;

    /** 成功 */
    resBody: {
      date: string;
      module?: Types.SchoolCalendarModule | undefined;
      events: Types.SchoolCalendarEvent[];
      courses: Types.RegisteredCourse[];
    };
  };
};

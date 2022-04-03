/* eslint-disable */
import type * as Types from "../@types";

export type Methods = {
  get: {
    query: {
      limit: number;
      offset: number;
    };

    status: 200;
    /** 成功 */
    resBody: Types.Information[];
  };
};

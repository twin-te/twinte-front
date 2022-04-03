/* eslint-disable */
import type * as Types from "../../@types";

export type Methods = {
  put: {
    status: 200;
    /** 成功 */
    resBody: Types.Tag;

    reqBody: {
      name: string;
    };
  };

  delete: {
    status: 204;
  };
};

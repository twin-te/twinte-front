/* eslint-disable */
import type * as Types from "../@types";

export type Methods = {
  /** 指定した複数の講義を取得する。 指定された講義が一部見つからない場合もエラーなく完了するが、 それらは結果には含まれない。 */
  get: {
    query: {
      year: number;
      /** 複数講義をカンマ区切りで指定できる */
      codes: string;
    };

    status: 200;
    /** 成功 */
    resBody: Types.Course[];
  };
};

/* eslint-disable */
import type * as Types from "../@types";

export type Methods = {
  get: {
    status: 200;
    /** 成功 */
    resBody: Types.Tag[];
  };

  /** 新しいタグは末尾に追加されます */
  post: {
    status: 200;
    /** 成功 */
    resBody: Types.Tag;

    reqBody: {
      name: string;
    };
  };

  /**
   * positionを変更するタグのidとpositionの配列を送信してください。
   * positionが重複している場合はエラーになります。
   */
  patch: {
    status: 200;
    /** 成功 */
    resBody: Types.TagPositionOnly[];
    reqBody: Types.TagPositionOnly[];
  };
};

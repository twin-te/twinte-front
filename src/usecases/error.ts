export class BaseError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
    /**
     * @warn 出力ターゲットがES2015より古い場合以下が必要
     */
    // Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * レスポンスが返ってこないときなどに使用
 */
export class NetworkError extends BaseError {
  constructor(e?: string) {
    super(e);
    this.message = "ネットワークエラー。通信状況をご確認下さい。";
  }
}

export type OriginalResponse = {
  data: {
    message: string;
    errors: object[];
  };
  status: number;
  statusText: string;
  headers: any;
};

/**
 * 2xx以外のレスポンス時に使用
 */
export class NetworkAccessError extends BaseError {
  status: number;
  constructor(public originalResponse: OriginalResponse, e?: string) {
    super(e);
    this.status = originalResponse.status;
    // 「6 ALREADY_EXISTS: xxxx」とサーバからエラーメッセージが返されるので
    // 見せなくても良い箇所を削除する
    this.message =
      originalResponse.data.message.replace(/.*?:/g, "") ??
      "サーバエラーが発生しました。";
  }
}

export const isErrorObj = (x: unknown): x is Error => {
  if (x == null || typeof x !== "object") return false;
  // x が null ではない object の場合は任意の文字列でプロパティアクセスしても
  // ランタイムエラーは発生しないので Record<string, unknown> と見なせる
  const record = x as Record<string, unknown>;
  return typeof record.name === "string" && typeof record.message === "string";
};

export const extractMessageOrDefault = (error: unknown) =>
  isErrorObj(error) ? error.message : "エラーが発生しました。";

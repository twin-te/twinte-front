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
 * 300~500番台のネットワークエラー
 */
export class NetworkAccessError extends BaseError {
  status: number;
  constructor(public originalResponse: OriginalResponse, e?: string) {
    super(e);
    this.status = originalResponse.status;
    this.message = originalResponse.data.message ?? "エラー";
  }
}

// export class InvalidCsvError extends BaseError {
//   constructor(public originalResponse: OriginalResponse, e?: string) {
//     super(e);
//     this.message = originalResponse.data.message;
//   }
// }

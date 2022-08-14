import {
  Err,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "~/domain/result";

export type ApiSuccessStatus = 200 | 204;

export type ApiFailedStatue = 400 | 401 | 404 | 500;

export type ApiStatus = ApiSuccessStatus | ApiFailedStatue;

export type ApiOriginalResponse<S> = {
  data: {
    message: string;
    errors: object[];
  };
  status: S;
  statusText: string;
  headers: any;
};

export type ApiRespoinse<T, S extends ApiStatus> = {
  body: T;
  headers: any;
  originalResponse: ApiOriginalResponse<S>;
  status: S;
};

export type ApiStatusToError = {
  400: InternalServerError;
  401: UnauthorizedError;
  404: NotFoundError;
  500: InternalServerError;
};

export type ApiStatusToErr = {
  [S in keyof ApiStatusToError]: Err<ApiStatusToError[S]>;
};

import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "~/domain/error";

export type ApiSuccessStatus = 200 | 204;

export type ApiFailedStatue = 400 | 401 | 404 | 500;

export type ApiStatus = ApiSuccessStatus | ApiFailedStatue;

export type ApiFailedStatueToError = {
  400: InternalServerError;
  401: UnauthorizedError;
  404: NotFoundError;
  500: InternalServerError;
};

export type ApiOriginalResponse<S> = {
  data: {
    message: string;
    errors: object[];
  };
  status: S;
  statusText: string;
  headers: unknown;
};

export type ApiRespoinse<T, S extends ApiStatus> = {
  body: T;
  headers: unknown;
  originalResponse: ApiOriginalResponse<S>;
  status: S;
};

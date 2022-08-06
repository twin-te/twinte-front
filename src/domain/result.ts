export class BaseError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = new.target.name;
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message);
  }
}

export class ValueError extends BaseError {
  constructor(message: string) {
    super(message);
  }
}

export class NetworkError extends BaseError {}

export class InternalServerError extends BaseError {
  constructor(message: string) {
    super(message);
  }
}

export type ResultError =
  | NotFoundError
  | ValueError
  | NetworkError
  | InternalServerError;

export class Ok<T, E extends ResultError> {
  constructor(readonly value: T) {}
  isOk(): this is Ok<T, E> {
    return true;
  }
  isErr(): this is Err<T, E> {
    return false;
  }
}

export class Err<T, E extends ResultError> {
  constructor(readonly value: E) {}
  isOk(): this is Ok<T, E> {
    return false;
  }
  isErr(): this is Err<T, E> {
    return true;
  }
}

export type Result<T = unknown, E extends ResultError = ResultError> =
  | Ok<T, E>
  | Err<T, E>;

export type PromiseResult<T, E extends ResultError = ResultError> = Promise<
  Result<T, E>
>;

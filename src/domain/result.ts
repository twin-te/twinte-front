/**
 * An argument has right type, but an inappropriate value.
 */
export class ValueError extends Error {
  readonly name = "ValueError";
}

/**
 * The resource is not found.
 */
export class NotFoundError extends Error {
  readonly name = "NotFoundError";
}

/**
 * When unauthorized user try to access resource that only authorized user can access, this error occurs.
 */
export class UnauthorizedError extends Error {
  readonly name = "UnauthorizedError";
}

export class NetworkError extends Error {
  readonly name = "NetworkError";
}

export class InternalServerError extends Error {
  readonly name = "InternalServerError";
}

export type ResultError =
  | ValueError
  | NotFoundError
  | UnauthorizedError
  | NetworkError
  | InternalServerError;

export class Ok<T = unknown> {
  constructor(readonly value: T) {}
  type = "ok" as const;
  isOk(): this is Ok<T> {
    return true;
  }
  isErr(): this is Err {
    return false;
  }
}

export class Err<E = ResultError> {
  constructor(readonly value: E) {}
  type = "err" as const;
  isOk(): this is Ok {
    return false;
  }
  isErr(): this is Err<E> {
    return true;
  }
}

export type Result<T, E extends ResultError> = Ok<T> | Err<E>;

export type PromiseResult<T, E extends ResultError> = Promise<Result<T, E>>;

export class ResultError extends Error {
  readonly type = "err";
}

/**
 * An argument has right type, but an inappropriate value.
 */
export class ValueError extends ResultError {
  readonly name = "ValueError";
}

/**
 * The resource is not found.
 */
export class NotFoundError extends ResultError {
  readonly name = "NotFoundError";
}

/**
 * When unauthorized user try to access resource that only authorized user can access, this error occurs.
 */
export class UnauthorizedError extends ResultError {
  readonly name = "UnauthorizedError";
}

export class NetworkError extends ResultError {
  readonly name = "NetworkError";
}

export class InternalServerError extends ResultError {
  readonly name = "InternalServerError";
}

export const isResultError = <T>(
  result: T
): result is Extract<T, ResultError> => {
  return result instanceof ResultError;
};

export const isNotResultError = <T>(
  result: T
): result is Exclude<T, ResultError> => {
  return !(result instanceof ResultError);
};

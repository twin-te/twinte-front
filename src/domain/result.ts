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

export const isError = <T>(result: T): result is Extract<T, ResultError> => {
  return result instanceof Error;
};

export const isNotError = <T>(result: T): result is Exclude<T, ResultError> => {
  return !(result instanceof Error);
};

export const identifyError = <N extends ResultError["name"]>(
  error: ResultError,
  name: N
): error is { [E in ResultError as E["name"]]: E }[N] => {
  return error.name === name;
};

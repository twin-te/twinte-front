//For deleteing user
import { Ports } from "~/application/ports";
import {
  InternalServerError,
  isResultError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";

export const deleteUser = (ports: Ports) => async (): Promise<
  null | UnauthorizedError | NetworkError | InternalServerError
> => {
  const result = await ports.userRepository.deleteUser();
  if (isResultError(result)) return result;

  return result;
};

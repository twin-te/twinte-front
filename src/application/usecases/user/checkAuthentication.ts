import { Ports } from "~/application/ports";
import {
  InternalServerError,
  isNotResultError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";

/**
 * Return true if the user is logged in. Return false otherwise.
 */
export const checkAuthentication = ({
  userRepository,
}: Ports) => async (): Promise<
  boolean | NetworkError | InternalServerError
> => {
  const result = await userRepository.getUser();

  if (isNotResultError(result)) return true;
  if (result instanceof UnauthorizedError) return false;
  return result;
};

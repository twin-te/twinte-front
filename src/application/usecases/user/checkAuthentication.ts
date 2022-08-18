import { Ports } from "~/application/ports";
import {
  identifyError,
  InternalServerError,
  isNotError,
  NetworkError,
} from "~/domain/result";

/**
 * Return true if the user is logged in. Return false otherwise.
 */
export const checkAuthentication = ({
  userRepository,
}: Ports) => async (): Promise<
  boolean | NetworkError | InternalServerError
> => {
  const result = await userRepository.getUser();

  if (isNotError(result)) return true;
  if (identifyError(result, "UnauthorizedError")) return false;
  return result;
};

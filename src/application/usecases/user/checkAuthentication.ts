import { Ports } from "~/application/ports";
import {
  identifyErr,
  InternalServerError,
  NetworkError,
  Ok,
  PromiseResult,
} from "~/domain/result";

/**
 * Return true if the user is logged in. Return false otherwise.
 */
export const checkAuthentication = ({
  userRepository,
}: Ports) => async (): PromiseResult<
  boolean,
  NetworkError | InternalServerError
> => {
  const result = await userRepository.getUser();

  if (result.isOk()) return new Ok(true);
  if (identifyErr(result, "UnauthorizedError")) return new Ok(false);
  return result;
};

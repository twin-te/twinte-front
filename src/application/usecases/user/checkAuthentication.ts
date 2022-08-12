import { Ports } from "~/application/ports";
import {
  InternalServerError,
  NetworkError,
  PromiseResult,
} from "~/domain/result";

export const checkAuthentication = ({
  userRepository,
}: Ports) => (): PromiseResult<boolean, NetworkError | InternalServerError> => {
  return userRepository.checkAuthentication();
};

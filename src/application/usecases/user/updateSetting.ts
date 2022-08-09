import { Ports } from "~/application/ports";
import { Setting } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";

export const updateSetting = ({ userRepository }: Ports) => (
  inputData: Partial<Setting>
): PromiseResult<
  Setting,
  UnauthorizedError | NetworkError | InternalServerError
> => {
  return userRepository.updateSetting(inputData);
};

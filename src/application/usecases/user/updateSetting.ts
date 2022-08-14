import { Ports } from "~/application/ports";
import { Setting } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";
import { getSetting } from "./getSetting";

export const updateSetting = (ports: Ports) => async (
  inputData: Partial<Setting>
): PromiseResult<
  Setting,
  UnauthorizedError | NetworkError | InternalServerError
> => {
  const result = await ports.userRepository.updateSetting(inputData);
  if (result.isErr()) return result;

  return getSetting(ports)();
};

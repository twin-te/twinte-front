import { Ports } from "~/application/ports";
import {
  InternalServerError,
  isResultError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";
import { Setting } from "~/domain/setting";
import { getSetting } from "./getSetting";

export const updateSetting = (ports: Ports) => async (
  inputData: Partial<Setting>
): Promise<
  Setting | UnauthorizedError | NetworkError | InternalServerError
> => {
  const result = await ports.userRepository.updateSetting(inputData);
  if (isResultError(result)) return result;

  return getSetting(ports)();
};

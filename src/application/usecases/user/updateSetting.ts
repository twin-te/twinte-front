import { Ports } from "~/application/ports";
import { Setting } from "~/domain";
import {
  InternalServerError,
  isError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/result";
import { getSetting } from "./getSetting";

export const updateSetting = (ports: Ports) => async (
  inputData: Partial<Setting>
): Promise<
  Setting | UnauthorizedError | NetworkError | InternalServerError
> => {
  const result = await ports.userRepository.updateSetting(inputData);
  if (isError(result)) return result;

  return getSetting(ports)();
};

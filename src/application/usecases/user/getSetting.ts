import { Ports } from "~/application/ports";
import {
  InternalServerError,
  isNotResultError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";
import { getInitialSetting, Setting } from "~/domain/setting";

export const getSetting = ({ userRepository }: Ports) => async (): Promise<
  Setting | NetworkError | InternalServerError
> => {
  const result = await userRepository.getSetting();

  if (isNotResultError(result)) return { ...getInitialSetting(), ...result };
  if (result instanceof UnauthorizedError) return getInitialSetting();
  return result;
};

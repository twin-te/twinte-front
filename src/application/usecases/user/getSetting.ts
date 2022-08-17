import { Ports } from "~/application/ports";
import { Setting } from "~/domain";
import {
  identifyError,
  InternalServerError,
  isNotError,
  NetworkError,
} from "~/domain/result";

const getSettingInitValue = (): Setting => ({
  darkMode: false,
  saturdayCourseMode: false,
  nightPeriodMode: false,
  timeLabelMode: true,
  displayYear: 0,
});

export const getSetting = ({ userRepository }: Ports) => async (): Promise<
  Setting | NetworkError | InternalServerError
> => {
  const result = await userRepository.getSetting();

  if (isNotError(result)) {
    const setting: Setting = { ...getSettingInitValue(), ...result };
    return setting;
  } else if (identifyError(result, "UnauthorizedError"))
    return getSettingInitValue();
  else return result;
};

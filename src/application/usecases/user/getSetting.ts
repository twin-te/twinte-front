import { Ports } from "~/application/ports";
import { Setting } from "~/domain";
import {
  identifyErr,
  InternalServerError,
  NetworkError,
  Ok,
  PromiseResult,
} from "~/domain/result";

const getSettingInitValue = (): Setting => ({
  darkMode: false,
  saturdayCourseMode: false,
  nightPeriodMode: false,
  timeLabelMode: true,
  displayYear: 0,
});

export const getSetting = ({
  userRepository,
}: Ports) => async (): PromiseResult<
  Setting,
  NetworkError | InternalServerError
> => {
  const result = await userRepository.getSetting();

  if (result.isOk()) {
    const setting: Setting = { ...getSettingInitValue(), ...result.value };
    return new Ok(setting);
  } else if (identifyErr(result, "UnauthorizedError"))
    return new Ok(getSettingInitValue());
  else return result;
};

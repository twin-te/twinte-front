import { Ports } from "~/application/ports";
import { Setting, User } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  Ok,
  PromiseResult,
} from "~/domain/result";
import { getKeysFromObj } from "~/utils";

const settingInitialValue: Setting = {
  darkMode: false,
  displaySaturdayCourseMode: false,
  displayNightPeriodMode: false,
  displayTimeLabelMode: true,
  displayYear: 0,
};

export const getSetting = ({
  userRepository,
}: Ports) => async (): PromiseResult<
  Setting,
  NetworkError | InternalServerError
> => {
  const result = await userRepository.getSetting();
  if (result.isErr()) return result;

  const setting = getKeysFromObj(settingInitialValue).reduce((setting, key) => {
    //  @ts-ignore
    setting[key] = result[key] ?? settingInitialValue[key];
    return setting;
  }, {} as Setting);

  return new Ok(setting);
};

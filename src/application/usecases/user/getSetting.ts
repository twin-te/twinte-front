import { Ports } from "~/application/ports";
import { Setting } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  Ok,
  PromiseResult,
} from "~/domain/result";

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

  const setting: Setting = { ...settingInitialValue, ...result.value };

  return new Ok(setting);
};

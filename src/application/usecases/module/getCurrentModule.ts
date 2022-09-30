import dayjs from "dayjs";
import { Ports } from "~/application/ports";
import {
  InternalServerError,
  isResultError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";
import { Module } from "~/domain/module";
import { isBetween } from "~/utils";

/**
 * Return the current module.
 * If the module does not exist, return the closest appropriate module.
 */
export const getCurrentModule = ({ calendarRepository }: Ports) => async (
  year: number
): Promise<Module | UnauthorizedError | NetworkError | InternalServerError> => {
  const result = await calendarRepository.getModuleInformationList(year);
  if (isResultError(result)) return result;

  const today = dayjs();
  const moduleInfomation = result.find(({ startDate, endDate }) =>
    isBetween(today, startDate, endDate, "day")
  );

  if (moduleInfomation) return moduleInfomation.module;

  switch (today.month()) {
    case 11: // December
      return "FallB";
    case 0: // January
      return "FallC";
    case 2: // March
      return "SpringVacation";
    case 3: // April
      return "SpringVacation";
    default:
      return new InternalServerError(
        "The information about module is inappropriate."
      );
  }
};

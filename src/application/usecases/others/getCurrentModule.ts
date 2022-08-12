import dayjs from "dayjs";
import { Ports } from "~/application/ports";
import { Module } from "~/domain";
import {
  Err,
  InternalServerError,
  NetworkError,
  Ok,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";
import { isBetween } from "~/utils";

/**
 * Return the current module.
 * If the module does not exist, return the closest appropriate module.
 */
export const getCurrentModule = ({ calendarRepository }: Ports) => async (
  year: number
): PromiseResult<
  Module,
  UnauthorizedError | NetworkError | InternalServerError
> => {
  const result = await calendarRepository.getModuleInformation(year);
  if (result.isErr()) return result;

  const today = dayjs();
  const moduleInfomation = result.value.find(({ startDate, endDate }) =>
    isBetween(today, startDate, endDate, "day")
  );

  if (moduleInfomation) return new Ok(moduleInfomation.module);

  switch (today.month()) {
    case 11: // December
      return new Ok<Module>("FallB");
    case 0: // January
      return new Ok<Module>("FallC");
    case 2: // March
      return new Ok<Module>("SpringVacation");
    case 3: // April
      return new Ok<Module>("SpringVacation");
    default:
      return new Err(
        new InternalServerError(
          "The information about module is inappropriate."
        )
      );
  }
};

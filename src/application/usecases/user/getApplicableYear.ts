import dayjs from "dayjs";
import { Ports } from "~/application/ports";
import {
  InternalServerError,
  NetworkError,
  Ok,
  PromiseResult,
} from "~/domain/result";
import { getSetting } from "./getSetting";

export const getCurrentYear = (): number => {
  const today = dayjs();
  return today.month() < 3 ? today.year() - 1 : today.year();
};

const isValidYear = (year: number): boolean => {
  const currentYear = getCurrentYear();
  return 2019 <= year && year <= currentYear;
};

export const getApplicableYear = async (
  ports: Ports
) => async (): PromiseResult<number, NetworkError | InternalServerError> => {
  const result = await getSetting(ports)();
  if (result.isErr()) return result;

  const year =
    result.isOk() && isValidYear(result.value.displayYear)
      ? result.value.displayYear
      : 0;

  return new Ok(year === 0 ? getCurrentYear() : year);
};

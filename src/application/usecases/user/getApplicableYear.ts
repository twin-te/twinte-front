import dayjs from "dayjs";
import { Ports } from "~/application/ports";
import {
  InternalServerError,
  NetworkError,
  Ok,
  PromiseResult,
} from "~/domain/result";
import { getAcademicYear } from "~/domain/utils";
import { getSetting } from "./getSetting";

const getCurrentAcademicYear = (): number => {
  return getAcademicYear(dayjs());
};

const isValidAcademicYear = (year: number): boolean => {
  const currentAcademicYear = getCurrentAcademicYear();
  return 2019 <= year && year <= currentAcademicYear;
};

export const getApplicableYear = async (
  ports: Ports
) => async (): PromiseResult<number, NetworkError | InternalServerError> => {
  const result = await getSetting(ports)();

  const year =
    result.isOk() && isValidAcademicYear(result.value.displayYear)
      ? result.value.displayYear
      : getCurrentAcademicYear();

  return new Ok(year);
};

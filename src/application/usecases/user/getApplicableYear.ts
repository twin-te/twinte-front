import { Ports } from "~/application/ports";
import {
  InternalServerError,
  isNotResultError,
  NetworkError,
} from "~/domain/error";
import { currentAcademicYear, validateAcademicYear } from "~/domain/year";
import { getSetting } from "./getSetting";

export const getApplicableYear = (ports: Ports) => async (): Promise<
  number | NetworkError | InternalServerError
> => {
  const result = await getSetting(ports)();

  const year =
    isNotResultError(result) && validateAcademicYear(result.displayYear)
      ? result.displayYear
      : currentAcademicYear;

  return year;
};

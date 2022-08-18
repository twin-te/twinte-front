import { Ports } from "~/application/ports";
import { InternalServerError, isNotError, NetworkError } from "~/domain/result";
import { getAcademicYear } from "~/domain/utils";
import { getToday } from "~/utils";
import { getSetting } from "./getSetting";

const getCurrentAcademicYear = (): number => {
  return getAcademicYear(getToday());
};

const isValidAcademicYear = (year: number): boolean => {
  const currentAcademicYear = getCurrentAcademicYear();
  return 2019 <= year && year <= currentAcademicYear;
};

export const getApplicableYear = async (ports: Ports) => async (): Promise<
  number | NetworkError | InternalServerError
> => {
  const result = await getSetting(ports)();

  const year =
    isNotError(result) && isValidAcademicYear(result.displayYear)
      ? result.displayYear
      : getCurrentAcademicYear();

  return year;
};

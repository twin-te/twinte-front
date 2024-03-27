import dayjs, { Dayjs } from "dayjs";
import { NormalDay } from "~/domain/day";
import * as SharedPB from "~/infrastructure/api/gen/shared/type_pb";

export const fromPBAcademicYear = (
  pbAcademicYear: SharedPB.AcademicYear
): number => {
  return pbAcademicYear.value;
};

export const toPBAcademicYear = (
  academicYear: number
): SharedPB.AcademicYear => {
  return new SharedPB.AcademicYear({ value: academicYear });
};

export const fromPBUUID = (pbUUID: SharedPB.UUID): string => {
  return pbUUID.value;
};

export const toPBUUID = (uuid: string): SharedPB.UUID => {
  return new SharedPB.UUID({ value: uuid });
};

export const fromPBRFC3339FullDate = (
  pbFullDate: SharedPB.RFC3339FullDate
): Dayjs => {
  return dayjs(pbFullDate.value);
};

export const toPBRFC3339FullDate = (date: Dayjs): SharedPB.RFC3339FullDate => {
  return new SharedPB.RFC3339FullDate({ value: date.format("YYYY-MM-DD") });
};

export const fromPBRFC3339DateTime = (
  pbDateTime: SharedPB.RFC3339DateTime
): Dayjs => {
  return dayjs(pbDateTime.value);
};

export const fromPBWeekday = (pbWeekday: SharedPB.Weekday): NormalDay => {
  switch (pbWeekday) {
    case SharedPB.Weekday.SUNDAY:
      return "Sun";
    case SharedPB.Weekday.MONDAY:
      return "Mon";
    case SharedPB.Weekday.TUESDAY:
      return "Tue";
    case SharedPB.Weekday.WEDNESDAY:
      return "Wed";
    case SharedPB.Weekday.THURSDAY:
      return "Thu";
    case SharedPB.Weekday.FRIDAY:
      return "Fri";
    case SharedPB.Weekday.SATURDAY:
      return "Sat";
  }
  throw Error(`invalid enum ${pbWeekday}`);
};

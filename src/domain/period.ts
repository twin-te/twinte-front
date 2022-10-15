import { isContained } from "~/utils";

export type DaytimePeriod = "1" | "2" | "3" | "4" | "5" | "6";

export type NighttimePeriod = "7" | "8";

export type Period = DaytimePeriod | NighttimePeriod;

export const daytimePeriods: DaytimePeriod[] = ["1", "2", "3", "4", "5", "6"];

export const nighttimePeriods: NighttimePeriod[] = ["7", "8"];

export const periods: Period[] = ["1", "2", "3", "4", "5", "6", "7", "8"];

export const isDaytimePeriod = (period: unknown): period is DaytimePeriod => {
  return isContained(period, daytimePeriods);
};

export const isNighttimePeriod = (
  period: unknown
): period is NighttimePeriod => {
  return isContained(period, nighttimePeriods);
};

export const isPeriod = (period: unknown): period is Period => {
  return isContained(period, periods);
};

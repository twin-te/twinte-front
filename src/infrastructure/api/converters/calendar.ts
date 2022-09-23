import dayjs from "dayjs";
import { normalDays } from "~/domain/day";
import { Event, isNormalEventType } from "~/domain/event";
import { ModuleInformation } from "~/domain/module";
import { isContained } from "~/utils";
import * as ApiType from "../aspida/@types";

export const apiToEvent = ({
  date,
  eventType,
  description,
  changeTo,
}: ApiType.SchoolCalendarEvent): Event | undefined => {
  if (isNormalEventType(eventType)) {
    return { date: dayjs(date), eventType, description };
  }

  if (isContained(changeTo, normalDays)) {
    return {
      date: dayjs(date),
      eventType,
      description,
      changeTo,
    };
  }

  return undefined;
};

export const apiToModuleInformation = ({
  year,
  module,
  start,
  end,
}: ApiType.SchoolCalendarModule): ModuleInformation => {
  return {
    year,
    module,
    startDate: dayjs(start),
    endDate: dayjs(end),
  };
};

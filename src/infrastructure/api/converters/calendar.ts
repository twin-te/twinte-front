import dayjs from "dayjs";
import { Event, ModuleInformation } from "~/domain";
import { normalDays } from "~/domain/utils";
import { isNormalEventType } from "~/domain/validations";
import { isContain } from "~/utils";
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

  if (isContain(changeTo, normalDays)) {
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

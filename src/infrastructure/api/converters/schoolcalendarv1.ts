import dayjs from "dayjs";
import { Event, EventType, isNormalEventType } from "~/domain/event";
import { Module } from "~/domain/module";
import {
  fromPBRFC3339FullDate,
  fromPBWeekday,
} from "~/infrastructure/api/converters/shared";
import * as SchoolCalendarV1PB from "~/infrastructure/api/gen/schoolcalendar/v1/type_pb";
import { assurePresence } from "./utils";

export const fromPBModule = (pbModule: SchoolCalendarV1PB.Module): Module => {
  switch (pbModule) {
    case SchoolCalendarV1PB.Module.SPRING_A:
      return "SpringA";
    case SchoolCalendarV1PB.Module.SPRING_B:
      return "SpringB";
    case SchoolCalendarV1PB.Module.SPRING_C:
      return "SpringC";
    case SchoolCalendarV1PB.Module.SUMMER_VACATION:
      return "SummerVacation";
    case SchoolCalendarV1PB.Module.FALL_A:
      return "FallA";
    case SchoolCalendarV1PB.Module.FALL_B:
      return "FallB";
    case SchoolCalendarV1PB.Module.WINTER_VACATION:
      const now = dayjs();
      return now.month() === 11 ? "FallB" : "FallC";
    case SchoolCalendarV1PB.Module.FALL_C:
      return "FallC";
    case SchoolCalendarV1PB.Module.SPRING_VACATION:
      return "SpringVacation";
  }
  throw Error(`invalid enum ${pbModule}`);
};

export const fromPBEventType = (
  pbEventType: SchoolCalendarV1PB.EventType
): EventType => {
  switch (pbEventType) {
    case SchoolCalendarV1PB.EventType.HOLIDAY:
      return "Holiday";
    case SchoolCalendarV1PB.EventType.PUBLIC_HOLIDAY:
      return "PublicHoliday";
    case SchoolCalendarV1PB.EventType.EXAM:
      return "Exam";
    case SchoolCalendarV1PB.EventType.SUBSTITUTE_DAY:
      return "SubstituteDay";
    case SchoolCalendarV1PB.EventType.OTHER:
      return "Other";
  }
  throw Error(`invalid enum ${pbEventType}`);
};

export const fromPBEvent = (pbEvent: SchoolCalendarV1PB.Event): Event => {
  const eventType = fromPBEventType(pbEvent.type);

  if (isNormalEventType(eventType)) {
    return {
      date: fromPBRFC3339FullDate(assurePresence(pbEvent.date)),
      eventType: eventType,
      description: pbEvent.description,
    };
  }

  return {
    date: fromPBRFC3339FullDate(assurePresence(pbEvent.date)),
    eventType: eventType,
    description: pbEvent.description,
    changeTo: fromPBWeekday(assurePresence(pbEvent.changeTo)),
  };
};

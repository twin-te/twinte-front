import { Event, isNormalEvent } from "~/domain/event";
import { normalDayMap } from "./day";

export const eventToDisplay = (event: Event): string => {
  return isNormalEvent(event)
    ? event.description
    : `${normalDayMap[event.changeTo]}曜日課`;
};

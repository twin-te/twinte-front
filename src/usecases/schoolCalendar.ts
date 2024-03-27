import {
  createPromiseClient,
  PromiseClient,
  Transport,
} from "@connectrpc/connect";
import dayjs, { Dayjs } from "dayjs";
import { InternalServerError, NetworkError } from "~/domain/error";
import { Event } from "~/domain/event";
import { Module } from "~/domain/module";
import {
  fromPBEvent,
  fromPBModule,
} from "~/infrastructure/api/converters/schoolcalendarv1";
import { toPBRFC3339FullDate } from "~/infrastructure/api/converters/shared";
import { SchoolCalendarService } from "~/infrastructure/api/gen/schoolcalendar/v1/service_connect";
import { handleError } from "~/infrastructure/api/utils";

export interface ISchoolCalendarUseCase {
  getEventByDate(
    date: Dayjs
  ): Promise<Event | null | NetworkError | InternalServerError>;

  /**
   * Return the current module.
   * If the module does not exist, return the closest appropriate module.
   */
  getCurrentModule(): Promise<Module | NetworkError | InternalServerError>;
}

export class SchoolCalendarUseCase implements ISchoolCalendarUseCase {
  #client: PromiseClient<typeof SchoolCalendarService>;

  constructor(transport: Transport) {
    this.#client = createPromiseClient(SchoolCalendarService, transport);
  }

  getEventByDate(
    date: Dayjs
  ): Promise<Event | null | NetworkError | InternalServerError> {
    return this.#client
      .getEventsByDate({ date: toPBRFC3339FullDate(date) })
      .then((res) => {
        const events = res.events.map((pbEvent) => fromPBEvent(pbEvent));
        if (events.length === 0) return null;
        return events[0];
      })
      .catch((error) => handleError(error));
  }

  getCurrentModule(): Promise<Module | NetworkError | InternalServerError> {
    return this.#client
      .getModuleByDate({ date: toPBRFC3339FullDate(dayjs()) })
      .then((res) => fromPBModule(res.module))
      .catch((error) => handleError(error));
  }
}

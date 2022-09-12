import { ICalendarRepository } from "~/application/ports/ICalendarRepository";
import {
  InternalServerError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";
import { Event } from "~/domain/event";
import { ModuleInformation } from "~/domain/module";
import { getAcademicYear } from "~/domain/year";
import { Api } from "~/infrastructure/api";
import * as ApiType from "~/infrastructure/api/aspida/@types";
import {
  apiToEvent,
  apiToModuleInformation,
} from "~/infrastructure/api/converters/calendar";

export class CalendarRepository implements ICalendarRepository {
  #api: Api;
  #years: Record<"event" | "module", Set<number>>;
  #events: Event[];
  #modules: ModuleInformation[];

  constructor() {
    this.#api = Api.getInstance();
    this.#years = { event: new Set(), module: new Set() };
    this.#events = [];
    this.#modules = [];
  }

  async getEventsByYear(
    year: number
  ): Promise<Event[] | UnauthorizedError | NetworkError | InternalServerError> {
    if (this.#years.event.has(year)) {
      const events = this.#events.filter(
        (event) => getAcademicYear(event.date) === year
      );

      return events;
    }

    return this.#api.call<
      ApiType.SchoolCalendarEvent[],
      Event[],
      200,
      400 | 401 | 500
    >(
      (client) => client.school_calendar.events.get({ query: { year } }),
      (body) => {
        const events = body
          .map(apiToEvent)
          .filter((event): event is Event => event != undefined);

        this.#years.event.add(year);
        this.#events = [...this.#events, ...events];

        return events;
      },
      [200],
      [400, 401, 500]
    );
  }

  async getModuleInformationList(
    year: number
  ): Promise<
    ModuleInformation[] | UnauthorizedError | NetworkError | InternalServerError
  > {
    if (this.#years.module.has(year)) {
      const moduleInformationList = this.#modules.filter(
        (module) => module.year === year
      );

      return moduleInformationList;
    }

    return this.#api.call<
      ApiType.SchoolCalendarModule[],
      ModuleInformation[],
      200,
      400 | 401 | 500
    >(
      (client) => client.school_calendar.modules.get({ query: { year } }),
      (body) => {
        const moduleInformationList = body.map(apiToModuleInformation);

        this.#years.module.add(year);
        this.#modules = [...this.#modules, ...moduleInformationList];

        return moduleInformationList;
      },
      [200],
      [400, 401, 500]
    );
  }
}

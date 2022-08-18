import { ICalendarRepository } from "~/application/ports/ICalendarRepository";
import { Event, ModuleInformation } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/result";
import { getAcademicYear } from "~/domain/utils";
import * as ApiType from "~/infrastructure/api/aspida/@types";
import {
  apiToEvent,
  apiToModuleInformation,
} from "~/infrastructure/api/converters/calendar";

import event_2021 from "~/tests/data/event_2021.json";
import event_2022 from "~/tests/data/event_2022.json";
import module_2021 from "~/tests/data/module_2021.json";
import module_2022 from "~/tests/data/module_2022.json";
import { copy } from "~/utils";

export class CalendarRepositoryInMemory implements ICalendarRepository {
  #events: Event[];
  #modules: ModuleInformation[];

  constructor() {
    this.#events = ([
      ...event_2021,
      ...event_2022,
    ] as ApiType.SchoolCalendarEvent[])
      .map(apiToEvent)
      .filter((event): event is Event => event != undefined);

    this.#modules = ([
      ...module_2021,
      ...module_2022,
    ] as ApiType.SchoolCalendarModule[]).map(apiToModuleInformation);
  }

  async getEventsByYear(
    year: number
  ): Promise<Event[] | UnauthorizedError | NetworkError | InternalServerError> {
    const events = this.#events.filter(
      (event) => getAcademicYear(event.date) === year
    );
    return copy(events);
  }

  async getModuleInformationList(
    year: number
  ): Promise<
    ModuleInformation[] | UnauthorizedError | NetworkError | InternalServerError
  > {
    const moduleInformationList = this.#modules.filter(
      (info) => info.year === year
    );
    return copy(moduleInformationList);
  }
}

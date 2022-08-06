import { Event, ModuleInformation } from "~/domain";
import { PromiseResult } from "~/domain/result";

export interface ICalendarRepository {
  getEventsByYear(year: number): PromiseResult<Event[]>;

  getModuleInformation(year: number): PromiseResult<ModuleInformation[]>;
}

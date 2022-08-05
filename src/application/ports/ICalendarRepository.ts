import { Event, ModuleInformation } from "~/domain";
import { Result } from "~/domain/result";

export interface ICalendarRepository {
  getEventsByYear(year: number): Promise<Result<Event[]>>;

  getModuleInformation(year: number): Promise<Result<ModuleInformation[]>>;
}

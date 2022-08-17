import { Event, ModuleInformation } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/result";

export interface ICalendarRepository {
  getEventsByYear(
    year: number
  ): Promise<Event[] | UnauthorizedError | NetworkError | InternalServerError>;

  getModuleInformationList(
    year: number
  ): Promise<
    ModuleInformation[] | UnauthorizedError | NetworkError | InternalServerError
  >;
}

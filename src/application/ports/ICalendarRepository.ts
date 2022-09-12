import {
  InternalServerError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";
import { Event } from "~/domain/event";
import { ModuleInformation } from "~/domain/module";

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

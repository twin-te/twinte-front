import { Event, ModuleInformation } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";

export interface ICalendarRepository {
  getEventsByYear(
    year: number
  ): PromiseResult<
    Event[],
    UnauthorizedError | NetworkError | InternalServerError
  >;

  getModuleInformation(
    year: number
  ): PromiseResult<
    ModuleInformation[],
    UnauthorizedError | NetworkError | InternalServerError
  >;
}

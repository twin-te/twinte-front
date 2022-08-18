import { Setting, User } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/result";

export interface IUserRepository {
  getUser(): Promise<
    User | UnauthorizedError | NetworkError | InternalServerError
  >;

  getSetting(): Promise<
    Partial<Setting> | UnauthorizedError | NetworkError | InternalServerError
  >;

  updateSetting(
    inputData: Partial<Setting>
  ): Promise<
    Partial<Setting> | UnauthorizedError | NetworkError | InternalServerError
  >;
}

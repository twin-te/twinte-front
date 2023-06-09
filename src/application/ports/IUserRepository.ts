import {
  InternalServerError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";
import { Setting } from "~/domain/setting";
import { User } from "~/domain/user";

export interface IUserRepository {
  getUser(): Promise<
    User | UnauthorizedError | NetworkError | InternalServerError
  >;
  deleteUser(): Promise<
    null | UnauthorizedError | NetworkError | InternalServerError
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

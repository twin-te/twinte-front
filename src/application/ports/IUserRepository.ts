import { Setting, User } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";

export interface IUserRepository {
  getUser(): PromiseResult<
    User,
    UnauthorizedError | NetworkError | InternalServerError
  >;

  getSetting(): PromiseResult<
    Partial<Setting>,
    UnauthorizedError | NetworkError | InternalServerError
  >;

  updateSetting(
    inputData: Partial<Setting>
  ): PromiseResult<
    Partial<Setting>,
    UnauthorizedError | NetworkError | InternalServerError
  >;
}

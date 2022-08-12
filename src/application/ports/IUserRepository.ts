import { Setting, User } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";

export interface IUserRepository {
  /**
   * Returns true if the user is logged in. Returns false otherwise.
   */
  checkAuthentication(): PromiseResult<
    boolean,
    NetworkError | InternalServerError
  >;

  getSetting(): PromiseResult<
    Partial<Setting>,
    NetworkError | InternalServerError
  >;

  updateSetting(
    inputData: Partial<Setting>
  ): PromiseResult<
    Setting,
    UnauthorizedError | NetworkError | InternalServerError
  >;
}

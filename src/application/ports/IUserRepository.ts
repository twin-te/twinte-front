import { User } from "~/domain";
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

  getUser(): PromiseResult<
    User,
    UnauthorizedError | NetworkError | InternalServerError
  >;
}

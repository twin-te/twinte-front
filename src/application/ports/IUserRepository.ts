import { User } from "~/domain";
import { PromiseResult } from "~/domain/result";

export interface IUserRepository {
  /**
   * Returns true if the user is logged in. Returns false otherwise.
   */
  checkAuthentication(): PromiseResult<boolean>;

  getUser(): PromiseResult<User>;
}

import { User } from "~/domain";
import { Result } from "~/domain/result";

export interface IUserRepository {
  /**
   * Returns true if the user is logged in. Returns false otherwise.
   */
  checkAuthentication(): Promise<Result<boolean>>;

  getUser(): Promise<Result<User>>;
}

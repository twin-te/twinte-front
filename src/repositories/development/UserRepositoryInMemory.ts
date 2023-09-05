import { User } from "~/domain/user";
import { deepCopy, createId } from "~/utils";
import { UserRepository } from "../production/UserRepository";

export class UserRepositoryInMemory extends UserRepository {
  #user: User;

  constructor() {
    super();
    this.#user = {
      id: createId(),
      authentication: {
        twitter: true,
        google: false,
        apple: false,
      },
    };
  }

  async getUser(): Promise<User> {
    return deepCopy(this.#user);
  }
}

import { User } from "~/domain/user";
import { deepCopy, uuid } from "~/utils";
import { UserRepository } from "../production/UserRepository";

export class UserRepositoryInMemory extends UserRepository {
  #user: User;

  constructor() {
    super();
    this.#user = {
      id: uuid(),
      name: "Twin:te",
    };
  }

  async getUser(): Promise<User> {
    return deepCopy(this.#user);
  }
}

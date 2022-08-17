import { User } from "~/domain";
import { copy } from "~/utils";
import { UserRepository } from "../production/UserRepository";

export class UserRepositoryInMemory extends UserRepository {
  #user: User;

  constructor() {
    super();
    this.#user = {
      id: new Date().getTime().toString(16),
      name: "Twin:te",
    };
  }

  async getUser(): Promise<User> {
    return copy(this.#user);
  }
}

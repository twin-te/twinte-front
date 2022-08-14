import { IUserRepository } from "~/application/ports/IUserRepository";
import { Setting, User } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  Ok,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";
import { settingProps } from "~/domain/utils";
import { Api } from "~/infrastructure/api";
import * as ApiType from "~/infrastructure/api/aspida/@types";
import { LocalStorage } from "~/infrastructure/localstorage";
import { getKeysFromObj } from "~/utils";

export class UserRepository implements IUserRepository {
  #api: Api;
  #localStorage: LocalStorage;
  #user: User | undefined;
  #setting: Partial<Setting> | undefined;

  constructor() {
    this.#api = Api.getInstance();
    this.#localStorage = LocalStorage.getInstance();
    this.#user = undefined;
    this.#setting = undefined;
  }

  async getUser(): PromiseResult<
    User,
    UnauthorizedError | NetworkError | InternalServerError
  > {
    if (this.#user) return new Ok(this.#user);

    return this.#api.call<ApiType.User, User, 200, 401 | 500>(
      (client) => client.users.me.get(),
      (body) => {
        this.#user = body;
        return new Ok(this.#user);
      },
      [200],
      [401, 500]
    );
  }

  /**
   * Return setting whose value is not undefined.
   */
  async getSetting(): PromiseResult<
    Partial<Setting>,
    UnauthorizedError | NetworkError | InternalServerError
  > {
    if (this.#setting) return new Ok(this.#setting);

    const setting = settingProps.reduce<Partial<Setting>>((map, prop) => {
      const value = this.#localStorage.get(prop);
      return value ? { ...map, prop: value } : map;
    }, {});

    this.#setting = setting;

    return new Ok(setting);
  }

  async updateSetting(
    inputData: Partial<Setting>
  ): PromiseResult<
    Partial<Setting>,
    UnauthorizedError | NetworkError | InternalServerError
  > {
    getKeysFromObj(inputData).forEach((prop) => {
      this.#localStorage.set(prop, inputData[prop]);
    });

    this.#setting = { ...this.#setting, ...inputData };

    return new Ok(this.#setting);
  }
}

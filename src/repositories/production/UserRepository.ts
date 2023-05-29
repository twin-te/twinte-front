import { IUserRepository } from "~/application/ports/IUserRepository";
import {
  InternalServerError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";
import { Setting, settingProps } from "~/domain/setting";
import { User } from "~/domain/user";
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

  async getUser(): Promise<
    User | UnauthorizedError | NetworkError | InternalServerError
  > {
    if (this.#user) return this.#user;

    return this.#api.call<ApiType.User, User, 200, 401 | 500>(
      (client) => client.users.me.get(),
      (body) => {
        this.#user = body;
        return this.#user;
      },
      [200],
      [401, 500]
    );
  }

  async deleteUser(): Promise<
    null | UnauthorizedError | NetworkError | InternalServerError
  > {
    return this.#api.call<void, null, 200 | 204, 401 | 500>(
      (client) => client.users.me.delete(),
      () => {
        this.#user = undefined;
        return null;
      },
      [200, 204],
      [401, 500]
    );
  }

  /**
   * Return setting whose value is not undefined.
   */
  async getSetting(): Promise<
    Partial<Setting> | UnauthorizedError | NetworkError | InternalServerError
  > {
    if (this.#setting) return this.#setting;

    const setting = settingProps.reduce<Partial<Setting>>((map, prop) => {
      const value = this.#localStorage.get(prop);
      return value ? { ...map, [prop]: value } : map;
    }, {});

    this.#setting = setting;

    return setting;
  }

  async updateSetting(
    inputData: Partial<Setting>
  ): Promise<
    Partial<Setting> | UnauthorizedError | NetworkError | InternalServerError
  > {
    getKeysFromObj(inputData).forEach((prop) => {
      this.#localStorage.set(prop, inputData[prop]);
    });

    this.#setting = { ...this.#setting, ...inputData };

    return this.#setting;
  }
}

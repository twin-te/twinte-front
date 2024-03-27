import {
  InternalServerError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";
import { Setting, settingProps, getInitialSetting } from "~/domain/setting";
import { currentAcademicYear, validateAcademicYear } from "~/domain/year";
import { LocalStorage } from "~/infrastructure/localstorage";
import { getKeysFromObj, deepCopy } from "~/utils";

export interface ISettingUseCase {
  getSetting(): Promise<Setting | NetworkError | InternalServerError>;

  updateSetting(
    inputData: Partial<Setting>
  ): Promise<Setting | UnauthorizedError | NetworkError | InternalServerError>;

  getApplicableYear(): Promise<number | NetworkError | InternalServerError>;
}

export class SettingUseCase implements ISettingUseCase {
  #localStorage: LocalStorage;
  #setting: Setting;

  constructor() {
    this.#localStorage = LocalStorage.getInstance();
    this.#setting = settingProps.reduce<Setting>((setting, prop) => {
      const value = this.#localStorage.get(prop);
      return value ? { ...setting, [prop]: value } : setting;
    }, getInitialSetting());
  }

  getSetting(): Promise<Setting | NetworkError | InternalServerError> {
    return Promise.resolve(deepCopy(this.#setting));
  }

  updateSetting(
    inputData: Partial<Setting>
  ): Promise<Setting | UnauthorizedError | NetworkError | InternalServerError> {
    getKeysFromObj(inputData).forEach((prop) => {
      this.#localStorage.set(prop, inputData[prop]);
    });

    this.#setting = { ...this.#setting, ...inputData };

    return Promise.resolve(deepCopy(this.#setting));
  }

  async getApplicableYear(): Promise<
    number | NetworkError | InternalServerError
  > {
    return Promise.resolve(
      validateAcademicYear(this.#setting.displayYear)
        ? this.#setting.displayYear
        : currentAcademicYear
    );
  }
}

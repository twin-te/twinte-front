import {
  LocalStorageConfig,
  localStorageConfig,
  LocalStoragePropType,
} from "./config";

export class LocalStorage {
  static #instance: LocalStorage | undefined = undefined;
  static #config: LocalStorageConfig = localStorageConfig;

  static getInstance(): LocalStorage {
    return LocalStorage.#instance ?? new LocalStorage();
  }

  get<K extends keyof LocalStoragePropType>(prop: K) {
    return LocalStorage.#config[prop]["getter"]();
  }

  set<K extends keyof LocalStoragePropType>(
    prop: K,
    value: LocalStoragePropType[K] | undefined
  ) {
    LocalStorage.#config[prop]["setter"](value);
  }
}

import axiosClient from "@aspida/axios";
import axios from "axios";
import { stringify } from "qs";
import {
  InternalServerError,
  NetworkError,
  NotFoundError,
  ResultError,
  UnauthorizedError,
} from "~/domain/error";
import { isContained } from "~/utils";
import createApiInstance, { ApiInstance } from "./aspida/$api";
import {
  ApiFailedStatue,
  ApiRespoinse,
  ApiFailedStatueToError,
  ApiSuccessStatus,
} from "./types";

const baseURL =
  import.meta.env.VITE_API_URL === undefined
    ? "https://app.dev.twinte.net/api/v3"
    : String(import.meta.env.VITE_API_URL);

const apiFailedStatusToError: {
  [S in ApiFailedStatue]: (message?: string) => ApiFailedStatueToError[S];
} = {
  400: (message) => new InternalServerError(message),
  401: (message) => new UnauthorizedError(message),
  404: (message) => new NotFoundError(message),
  500: (message) => new InternalServerError(message),
};

export class Api {
  static #instance: Api | undefined = undefined;
  #client: ApiInstance;

  constructor() {
    this.#client = createApiInstance(
      axiosClient(axios, {
        baseURL,
        paramsSerializer: (r: unknown) => stringify(r),
        validateStatus: () => true,
        withCredentials: true,
      })
    ) as ApiInstance;
  }

  static getInstance(): Api {
    if (Api.#instance == undefined) {
      Api.#instance = new Api();
    }

    return Api.#instance;
  }

  #handleApiFailedStatus<FS extends ApiFailedStatue>(
    status: FS,
    originalResponse: { data: { message: string } }
  ): ApiFailedStatueToError[FS] {
    const message = originalResponse.data.message;
    return apiFailedStatusToError[status](message);
  }

  async call<
    AR,
    CR,
    SS extends ApiSuccessStatus,
    FS extends ApiFailedStatue,
    CE extends ResultError = never
  >(
    api: (client: ApiInstance) => Promise<ApiRespoinse<AR, SS | FS>>,
    callback: (body: AR) => CR | CE,
    successStatusList: SS[],
    failedStatusList: FS[]
  ): Promise<
    CR | ApiFailedStatueToError[FS] | InternalServerError | NetworkError | CE
  > {
    let result: ApiRespoinse<AR, SS | FS>;

    try {
      result = await api(this.#client);
    } catch {
      // This dose not catch Error arising from HTTP Response error because of the Axios validateStatus setting.
      return new NetworkError();
    }

    const { body, originalResponse, status } = result;

    if (isContained(status, successStatusList)) {
      return callback(body);
    }

    if (isContained(status, failedStatusList)) {
      return this.#handleApiFailedStatus(status, originalResponse);
    }

    return new InternalServerError(`Invalid Status : ${status}`);
  }
}

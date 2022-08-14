import axiosClient from "@aspida/axios";
import axios from "axios";
import qs from "qs";
import {
  Err,
  InternalServerError,
  NetworkError,
  NotFoundError,
  Ok,
  ResultError,
  UnauthorizedError,
} from "~/domain/result";
import { isContain } from "~/utils";
import createApiInstance, { ApiInstance } from "./aspida/$api";
import {
  ApiFailedStatue,
  ApiRespoinse,
  ApiStatusToErr,
  ApiSuccessStatus,
} from "./types";

const baseURL =
  import.meta.env.VITE_API_URL === undefined
    ? "https://app.dev.twinte.net/api/v3"
    : String(import.meta.env.VITE_API_URL);

const apiStatusToErr: {
  [S in keyof ApiStatusToErr]: (message?: string) => ApiStatusToErr[S];
} = {
  400: (message) => new Err(new InternalServerError(message)),
  401: (message) => new Err(new UnauthorizedError(message)),
  404: (message) => new Err(new NotFoundError(message)),
  500: (message) => new Err(new InternalServerError(message)),
};

export class Api {
  static #instance: Api | undefined = undefined;
  #client: ApiInstance;

  constructor() {
    this.#client = createApiInstance(
      axiosClient(axios, {
        baseURL,
        paramsSerializer: (r: any) => qs.stringify(r),
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
  ): ApiStatusToErr[FS] {
    const message =
      status === 400
        ? "Bad Request"
        : status === 500
        ? originalResponse.data.message
        : undefined;
    return apiStatusToErr[status](message);
  }

  async call<
    AR,
    CR,
    SS extends ApiSuccessStatus,
    FS extends ApiFailedStatue,
    CE = never
  >(
    api: (client: ApiInstance) => Promise<ApiRespoinse<AR, SS | FS>>,
    callback: (body: AR) => Ok<CR> | (CE extends ResultError ? Err<CE> : never),
    successStatusList: SS[],
    failedStatusList: FS[]
  ): Promise<
    | Ok<CR>
    | ApiStatusToErr[FS]
    | Err<InternalServerError>
    | Err<NetworkError>
    | (CE extends ResultError ? Err<CE> : never)
  > {
    try {
      const {
        body,
        originalResponse,
        status,
      }: ApiRespoinse<AR, SS | FS> = await api(this.#client);
      if (isContain(status, successStatusList)) return callback(body);
      else if (isContain(status, failedStatusList))
        return this.#handleApiFailedStatus(status, originalResponse);
      else
        return new Err(new InternalServerError(`Invalid Status : ${status}`));
    } catch {
      return new Err(new NetworkError());
    }
  }
}

import {
  createPromiseClient,
  ConnectError,
  Code,
  PromiseClient,
  Transport,
} from "@connectrpc/connect";
import {
  InternalServerError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";
import { User } from "~/domain/user";
import { fromPBUser } from "~/infrastructure/api/converters/authv1";
import { assurePresence } from "~/infrastructure/api/converters/utils";
import { AuthService } from "~/infrastructure/api/gen/auth/v1/service_connect";
import { handleError } from "~/infrastructure/api/utils";

export interface IAuthUseCase {
  getUser(): Promise<User | null | NetworkError | InternalServerError>;

  /**
   * Return true if the user is logged in. Return false otherwise.
   */
  checkAuthentication(): Promise<boolean | NetworkError | InternalServerError>;

  deleteUser(): Promise<
    null | UnauthorizedError | NetworkError | InternalServerError
  >;
}

export class AuthUseCase implements IAuthUseCase {
  #client: PromiseClient<typeof AuthService>;

  constructor(transport: Transport) {
    this.#client = createPromiseClient(AuthService, transport);
  }

  getUser(): Promise<User | null | NetworkError | InternalServerError> {
    return this.#client
      .getMe({})
      .then((res) => fromPBUser(assurePresence(res.user)))
      .catch((error) => {
        return handleError(error, (connectError: ConnectError) => {
          if (connectError.code === Code.Unauthenticated) {
            return Promise.resolve(null);
          }

          throw error;
        });
      });
  }

  checkAuthentication(): Promise<boolean | NetworkError | InternalServerError> {
    return this.#client
      .getMe({})
      .then(() => true)
      .catch((error) => {
        return handleError(error, (connectError: ConnectError) => {
          if (connectError.code === Code.Unauthenticated) {
            return false;
          }

          throw error;
        });
      });
  }

  deleteUser(): Promise<
    null | UnauthorizedError | NetworkError | InternalServerError
  > {
    return this.#client
      .deleteAccount({})
      .then(() => null)
      .catch((error) => {
        return handleError(error, (connectError: ConnectError) => {
          if (connectError.code === Code.Unauthenticated) {
            return new UnauthorizedError();
          }

          throw error;
        });
      });
  }
}

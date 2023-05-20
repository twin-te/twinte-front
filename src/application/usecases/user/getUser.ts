import { Ports } from "~/application/ports";
import {
  InternalServerError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";
import { User } from "~/domain/user";

export const getUser = ({ userRepository }: Ports) => async (): Promise<
  User | null | NetworkError | InternalServerError
> => {
  const result = await userRepository.getUser();
  if (result instanceof UnauthorizedError) return null;
  return result;
};

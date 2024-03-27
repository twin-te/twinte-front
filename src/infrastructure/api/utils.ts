import { ConnectError } from "@connectrpc/connect";

import { NetworkError } from "~/domain/error";

export const handleError = <T>(
  error: unknown,
  callback: (connectError: ConnectError) => T = () => {
    throw error;
  }
) => {
  const connectError = ConnectError.from(error);

  if (
    connectError.cause instanceof TypeError &&
    connectError.cause.message === "Failed to fetch"
  ) {
    return new NetworkError();
  }

  return callback(connectError);
};

export const isErrorCode = (
  connectError: ConnectError,
  errorCode: string
): boolean => {
  return connectError.rawMessage.startsWith(`[${errorCode}]`);
};

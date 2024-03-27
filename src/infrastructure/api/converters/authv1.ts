import { User } from "~/domain/user";
import * as AuthV1PB from "~/infrastructure/api/gen/auth/v1/type_pb";
import { fromPBUUID } from "./shared";
import { assurePresence } from "./utils";

export const fromPBUser = (pbUser: AuthV1PB.User): User => {
  return {
    id: fromPBUUID(assurePresence(pbUser.id)),
    name: "",
  };
};

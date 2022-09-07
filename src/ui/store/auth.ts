import { computed, ref } from "vue";
import { usePorts } from "~/adapter";
import UseCase from "~/application/usecases";
import { isResultError } from "~/domain/error";
import { deepCopy } from "~/utils";

// state
const authState = ref(false);

// getter
export const getAuthState = () => {
  return computed(() => deepCopy(authState.value));
};

// mutation
export const updateAuthState = (newAuthState: boolean) => {
  authState.value = newAuthState;
};

// action
const ports = usePorts();

export const setAuthState = async () => {
  const result = await UseCase.checkAuthentication(ports)();
  if (isResultError(result)) throw result;
  authState.value = result;
};

import dayjs from "dayjs";
import { computed, ref } from "vue";
import { usePorts } from "~/adapter";
import UseCase from "~/application/usecases";
import { isResultError } from "~/domain/error";
import { eventToDisplay } from "~/presentation/presenters/event";
import { displayNormalEvent } from "~/presentation/viewmodels/event";
import { deepCopy } from "~/utils";

// state
const event = ref<string>(displayNormalEvent);

// getter
export const getEvent = () => {
  return computed(() => deepCopy(event.value));
};

// action
const ports = usePorts();

export const setEvent = async () => {
  const result = await UseCase.getEventByDate(ports)(dayjs());
  if (isResultError(result)) throw result;
  if (result !== null) event.value = eventToDisplay(result);
  else event.value = displayNormalEvent;
};

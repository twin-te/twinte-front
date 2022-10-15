import dayjs from "dayjs";
import { computed, ref } from "vue";
import { usePorts } from "~/adapter";
import UseCase from "~/application/usecases";
import { isResultError, UnauthorizedError } from "~/domain/error";
import { BaseModule, isBaseModule } from "~/domain/module";
import { currentAcademicYear } from "~/domain/year";
import { deepCopy } from "~/utils";

// state
const module = ref<BaseModule>("SpringA");
let currentModule: BaseModule;

// getter
export const getModule = async () => {
  if (currentModule == undefined) {
    currentModule = await getCurrentModule();
    setModule(currentModule);
  }

  return computed(() => deepCopy(module.value));
};

// mutation
export const setModule = (newModule: BaseModule) => {
  module.value = newModule;
};

// action
const ports = usePorts();

export const getCurrentModule = async () => {
  if (currentModule) return currentModule;

  const result = await UseCase.getCurrentModule(ports)(currentAcademicYear);
  if (result instanceof UnauthorizedError) return "SpringA";
  if (isResultError(result)) throw result;
  return isBaseModule(result)
    ? result
    : result === "SummerVacation"
    ? "SpringC"
    : dayjs().month() < 3
    ? "FallC"
    : "SpringA";
};

import { computed, ref } from "vue";
import { usePorts } from "~/adapter";
import UseCase from "~/application/usecases";
import { isResultError } from "~/domain/error";
import { currentAcademicYear } from "~/domain/year";
import { deepCopy } from "~/utils";

// state
const applicableYear = ref<number>(currentAcademicYear);

// getter
export const getApplicableYear = () => {
  return computed(() => deepCopy(applicableYear.value));
};

// action
const ports = usePorts();

export const setApplicableYear = async () => {
  const result = await UseCase.getApplicableYear(ports)();
  if (isResultError(result)) throw result;
  applicableYear.value = result;
};

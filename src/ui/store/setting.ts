import { useDark } from "@vueuse/core";
import { computed, ref } from "vue";
import { usePorts } from "~/adapter";
import UseCase from "~/application/usecases";
import { isResultError } from "~/domain/error";
import { getInitialSetting, Setting } from "~/domain/setting";
import { deepCopy } from "~/utils";

const isDark = useDark({
  selector: "body",
});

const setDarkMode = (darkMode: boolean) => {
  isDark.value = darkMode;
};

// state
const setting = ref<Setting>(getInitialSetting());

// getter
export const getSetting = () => {
  return computed(() => deepCopy(setting.value));
};

// action
const ports = usePorts();

export const setSetting = async () => {
  const result = await UseCase.getSetting(ports)();
  if (isResultError(result)) throw result;
  setting.value = result;
  setDarkMode(setting.value.darkMode);
};

export const updateSetting = async (inputData: Partial<Setting>) => {
  const result = await UseCase.updateSetting(ports)(inputData);
  if (isResultError(result)) throw result;
  setting.value = result;
  if ("darkMode" in inputData) setDarkMode(setting.value.darkMode);
};

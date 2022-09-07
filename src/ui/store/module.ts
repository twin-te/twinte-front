import { computed, ref } from "vue";
import { BaseModule } from "~/domain/module";
import { deepCopy } from "~/utils";

// state
const module = ref<BaseModule>("SpringA");

// getter
export const getModule = () => {
  return computed(() => deepCopy(module.value));
};

// mutation
export const setModule = (newModule: BaseModule) => {
  module.value = newModule;
};

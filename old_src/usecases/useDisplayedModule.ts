import { computed, ComputedRef } from "vue";
import { Ports } from "~/adapter";
import { ModuleJa } from "~/entities/module";
import { getCurrentModule } from "./getCurrentModule";

export const useDisplayedModule = async ({
  api,
  store,
  dayjs,
}: Ports): Promise<{
  displayedModule: ComputedRef<ModuleJa>;
  setDisplayedModule: (module: ModuleJa) => void;
}> => {
  // 初期化
  if (store.getters.module == null) {
    store.commit("setModule", await getCurrentModule({ api, store, dayjs }));
  }

  const displayedModule = computed(() => store.getters.module);
  const setDisplayedModule = (module: ModuleJa) => {
    if (["通年", "夏季休業中", "春季休業中"].includes(module)) return;
    store.commit("setModule", module);
  };

  return { displayedModule, setDisplayedModule };
};

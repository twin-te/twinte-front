import { computed, ref } from "vue";

const _creditYear = ref<number | undefined>(undefined);

export const useCreditYear = () => {
  const creditYear = computed(() => _creditYear.value);
  const updateCreditYear = (year: number | undefined) => {
    _creditYear.value = year;
  };

  return {
    creditYear,
    updateCreditYear,
  };
};

import { computed, ref } from "vue";

// state
const creditYear = ref<number>(0); // 0 means all year.

// getter
export const getCreditYear = () => {
  return computed(() => creditYear.value);
};

// mutation
export const updateCreditYear = (year = 0) => {
  creditYear.value = year;
};

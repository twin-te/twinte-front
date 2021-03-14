export type methodJa = "対面" | "同時双方向" | "オンデマンド" | "その他";

export type methodOption = methodJa | "指定なし";

export const methodOptions: methodOption[] = [
  "指定なし",
  "対面",
  "同時双方向",
  "オンデマンド",
  "その他",
];

export const createOption = (selectedOptions: { value: methodOption }[]) => {
  return methodOptions.filter((option) => {
    return !selectedOptions.some((obj) => obj.value === option);
  });
};

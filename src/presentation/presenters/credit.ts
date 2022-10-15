export const creditToDisplay = (credit: number): string => {
  return credit.toFixed(1);
};

export const displayToCredit = (credit: string): number => {
  return Number(credit);
};

/**
 * Check whether the credit is valid.
 * @param credit - The credit that you want to check.
 * @return If the credit is valid, return true. Otherwise, return false.
 */
export const validateCredit = (credit: string): boolean => {
  // Blank string is not valid.
  if (credit === "") return false;

  // Any string other than the numbers and decimal point is not valid.
  if (/[^0-9.]/.test(credit)) return false;

  // Decimal point
  const dots = credit.match(/\./g);

  if (dots == undefined) return true;

  // If a decimal point is present at the beginning or end of a sentence, the credit is not valid.
  if (/^\./.test(credit) || /\.$/.test(credit)) return false;

  // If more than one decimal point is present, the credit is not valid.
  if (dots.length > 1) return false;

  // Decimal point to the first place.
  if (credit.split(".")[1].length > 1) return false;

  return true;
};

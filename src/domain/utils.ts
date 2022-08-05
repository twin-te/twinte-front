/**
 * Check whether the credit is valid.
 * @param {string} credit - The credit that you want to check.
 * @return {boolean} If the credit is valid, return true. Otherwise, return false.
 */
export const isValidCredit = (credit: string): boolean => {
  // 小数点 "."
  const dots = credit.match(/\./g);

  // 空文字列はダメ
  if (credit === "") return false;

  // 0~9と"."以外が含まれていてはダメ
  if (/[^0-9.]/.test(credit)) return false;

  // 小数点が含まれないとダメ
  if (dots == undefined) return false;

  // 小数点の数が2つ以上はダメ
  if (dots.length > 1) return false;

  // 文頭・文末に"."がきたらダメ
  if (/^\./.test(credit) || /\.$/.test(credit)) return false;

  // 小数点以下は第１位まで
  if (dots && credit.split(".")[1].length > 1) return false;

  return true;
};

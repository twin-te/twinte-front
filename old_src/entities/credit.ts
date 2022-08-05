export const isValidCredit = (credit: string) => {
  // 小数点 "."
  const dots = credit.match(/\./g);

  // 空文字列はダメ
  if (credit === "") return false;

  // 0~9と"."以外が含まれていてはダメ
  if (/[^0-9.]/.test(credit)) return false;

  // 小数点の数が2つ以上はダメ
  if (dots && dots.length > 1) return false;

  // 文頭・文末に"."がきたらダメ
  if (/^\./.test(credit) || /\.$/.test(credit)) return false;

  // 小数点以下は第１位まで
  if (dots && credit.split(".")[1].length > 1) return false;

  return true;
};

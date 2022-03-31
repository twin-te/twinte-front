import { BaseError } from "./error";

const union = <T>(arr: T[]) => [...new Set(arr)];

export const getCoursesIdByFile = (file: File): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      const line = reader.result
        .split(/\r\n|\r|\n/)
        .filter((v) => v) // drop blank line
        .map((v) => v.replace(/"/g, ""));

      // 履修フォーマット
      if (line[0].length === 7) {
        resolve(line);
      }

      // 成績フォーマット
      if (line[0].split(",").length === 11) {
        line.splice(0, 1); // delete header
        resolve(union(line.map((v) => v.split(",")[2])));
      }

      throw new BaseError("このフォーマット形式に対応していません");
    };
    reader.onerror = (error) => reject(error);
  });
};

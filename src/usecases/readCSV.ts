import { BaseError } from "./error";

const union = <T>(arr: T[]) => [...new Set(arr)];

type Risyu = {
  type: "risyu";
  data: string[];
};
type Seiseki = {
  type: "seiseki";
  data: {
    code: string;
    year: number;
  }[];
};
type CSV = Risyu | Seiseki;

export const getCoursesIdByFile = (file: File): Promise<CSV> => {
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
        resolve({
          type: "risyu",
          data: line,
        });
      }

      // 成績フォーマット
      else if (line[0].split(",").length === 11) {
        line.splice(0, 1); // delete header
        resolve({
          type: "seiseki",
          data: union(
            line.map((v) => ({
              code: v.split(",")[2],
              year: Number(v.split(",")[9]),
            }))
          ),
        });
      } else throw new BaseError("このフォーマット形式に対応していません");
    };
    reader.onerror = (error) => reject(error);
  });
};

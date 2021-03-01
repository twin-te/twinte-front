import { Ports } from "~/adapter";
import { ModuleJa } from "~/entities/module";

/**
 * 現在の学期を取得する
 */
export const getCurrentModule = async ({ now }: Ports): Promise<ModuleJa> => {
  const month = now.month();
  const day = now.day();
  return (month >= 4 && month < 8) || (month == 8 && day < 8) ? "春A" : "秋A";
};

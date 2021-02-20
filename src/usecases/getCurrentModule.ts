import { Ports } from "~/adapter";
import { CourseModule } from "~/api/@types";

/**
 * 現在の学期を取得する
 */
export const getCurrentModule = async ({
  now,
}: Ports): Promise<CourseModule> => {
  const month = now.getMonth() - 1;
  const day = now.getDay();
  return (month >= 4 && month < 8) || (month == 8 && day < 8)
    ? "SpringA"
    : "FallA";
};

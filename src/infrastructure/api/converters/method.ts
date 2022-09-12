import { isEqualSet } from "~/utils";
import * as ApiType from "../aspida/@types";

export const isEqualCourseMethods = (
  methods1: ApiType.CourseMethod[],
  methods2: ApiType.CourseMethod[]
): boolean => {
  return isEqualSet(new Set(methods1), new Set(methods2));
};

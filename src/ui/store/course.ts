import { computed, ComputedRef, reactive } from "vue";
import { usePorts } from "~/adapter";
import UseCase from "~/application/usecases";
import { RegisteredCourse } from "~/domain/course";
import { isResultError } from "~/domain/error";
import { academicYears } from "~/domain/year";
import {
  addElementsInArray,
  deepCopy,
  deleteElementInArray,
  updateElementInArray,
} from "~/utils";

// state
const courses = reactive<RegisteredCourse[]>([]);
const years: Set<number> = new Set();

// getter
export const getAllCourses = (): ComputedRef<RegisteredCourse[]> => {
  return computed(() => deepCopy(courses));
};

export const getCoursesByYear = (
  year: number
): ComputedRef<RegisteredCourse[]> => {
  return computed(() =>
    deepCopy(courses.filter((course) => course.year === year))
  );
};

export const getCourseById = (
  id: string
): ComputedRef<RegisteredCourse | undefined> => {
  return computed(() => deepCopy(courses.find((course) => course.id == id)));
};

// action
const ports = usePorts();

export const setAllCourses = async () => {
  await Promise.all(academicYears.map((year) => setCoursesByYear(year)));
};

export const setCoursesByYear = async (year: number) => {
  if (years.has(year)) return;
  const result = await UseCase.getRegisteredCoursesByYear(ports)(year);
  if (isResultError(result)) throw result;
  result.forEach((course) => updateElementInArray(courses, course));
  years.add(year);
};

export const setCourseById = async (id: string) => {
  const result = await UseCase.getRegisteredCourseById(ports)(id);
  if (isResultError(result)) throw result;
  updateElementInArray(courses, result);
};

export const addCoursesByCodes = async (
  inputData: { year: number; code: string }[]
) => {
  const result = await UseCase.addCoursesByCodes(ports)(inputData);
  if (isResultError(result)) throw result;
  addElementsInArray(courses, result);
};

export const addCustomizedCourse = async (
  newCourse: Omit<RegisteredCourse, "id" | "code">
) => {
  const result = await UseCase.addCustomizedCourse(ports)(newCourse);
  if (isResultError(result)) throw result;
  updateElementInArray(courses, result);
};

export const updateCourse = async (
  id: string,
  updatedData: Partial<Omit<RegisteredCourse, "id" | "year" | "code">>
) => {
  const result = await UseCase.updateRegisteredCourse(ports)(id, updatedData);
  if (isResultError(result)) throw result;
  updateElementInArray(courses, result);
};

export const dropCourse = async (id: string) => {
  const result = await UseCase.dropRegisteredCourse(ports)(id);
  if (isResultError(result)) throw result;
  deleteElementInArray(courses, id);
};

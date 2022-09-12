import { removeDuplicate } from "~/utils";

export const apiToInstructors = (apiInstructor: string): string[] => {
  return removeDuplicate(
    apiInstructor.split(/,|、/).map((instructor) => instructor.trim())
  );
};

export const instructorsToApi = (instructors: string[]): string => {
  return instructors.join(",");
};

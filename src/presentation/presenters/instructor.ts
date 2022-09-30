export const instructorsToDisplay = (instructors: string[]): string => {
  return instructors.join(",");
};

export const validateInstructors = (instructors: string[]): boolean => {
  if (instructors.some((instructor) => instructor === "")) return false;
  if (new Set(instructors).size !== instructors.length) return false;

  return true;
};

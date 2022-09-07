export const instructorsToDisplay = (instructors: string[]): string => {
  return instructors.join(",");
};

export const validateInstructors = (instructors: string[]): boolean => {
  if (new Set(instructors).size !== instructors.length) return false;

  return true;
};

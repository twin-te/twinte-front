export type eventType =
  | "PublicHoliday"
  | "Holiday"
  | "Exam"
  | "SubstituteDay"
  | "Other";

export const eventMap: { [key in eventType]: string } = {
  PublicHoliday: "祝日",
  Holiday: "休日",
  Exam: "試験",
  SubstituteDay: "振替",
  Other: "通常日課",
};

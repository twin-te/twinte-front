import { removeDuplicate } from "~/utils";

export const apiToInstructors = (apiInstructor: string): string[] => {
  // [Workaround]
  // 担当教員がいない場合に BE は空文字で返すが、FE は空文字をバリデーションエラーとして扱うため、空配列に変換する
  if (apiInstructor === "") return [];
  return removeDuplicate(
    apiInstructor.split(/,|、/).map((instructor) => instructor.trim())
  );
};

export const instructorsToApi = (instructors: string[]): string => {
  return instructors.join(",");
};

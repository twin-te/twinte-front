export const getCoursesIdByFile = (file: File): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      const courses = reader.result
        .split(/\r\n|\r|\n/)
        .filter((v) => v) // drop blank line
        .map((v) => v.replace(/"/g, ""));
      resolve(courses);
    };
    reader.onerror = (error) => reject(error);
  });
};

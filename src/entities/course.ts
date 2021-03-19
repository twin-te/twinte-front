import { Course } from "~/api/@types";

export const getInitCourse = () => {
  const course: Course = {
    id: "",
    year: 0,
    code: "",
    name: "",
    instructor: "",
    credit: 0,
    overview: "",
    remarks: "",
    recommendedGrades: [],
    methods: [],
    schedules: [],
  };
  return course;
};

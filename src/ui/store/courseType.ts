import { computed, ref } from "vue";
import { deepCopy } from "~/utils";

type CourseType = "Normal" | "Special";

// state
const courseType = ref<CourseType>("Normal");

// getter
export const getCourseType = () => {
  return computed(() => deepCopy(courseType.value));
};

// mutation
export const toggleCourseType = () => {
  courseType.value = courseType.value === "Normal" ? "Special" : "Normal";
};

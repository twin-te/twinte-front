import { computed } from "vue";
import { Ports } from "~/adapter";

export const useSaturdayCourseMode = ({ store }: Ports) => {
  const storedSaturdayCourseMode = localStorage.getItem("saturday-course-mode");
  if (storedSaturdayCourseMode === "off") {
    store.commit("setSaturdayCourseMode", false);
  }

  const saturdayCourseMode = computed<boolean>(
    () => store.getters.saturdayCourseMode
  );

  const toggleSaturdayCourseMode = () => {
    if (saturdayCourseMode.value) {
      store.commit("setSaturdayCourseMode", false);
      localStorage.setItem("saturday-course-mode", "off");
    } else {
      store.commit("setSaturdayCourseMode", true);
      localStorage.setItem("saturday-course-mode", "on");
    }
  };

  return { saturdayCourseMode, toggleSaturdayCourseMode };
};

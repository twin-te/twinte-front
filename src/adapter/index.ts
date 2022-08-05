import { Ports } from "~/application/ports";
import { CourseRepository } from "~/repositories/CourseRepository";

export const usePorts = (): Ports => ({
  courseRepository: new CourseRepository(),
});

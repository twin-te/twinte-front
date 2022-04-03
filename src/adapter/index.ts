import { Ports } from "~/application/ports";
import { CourseRepository } from "~/gateways/CourseRepository";

export const usePorts = (): Ports => ({
  courseRepository: new CourseRepository(),
});

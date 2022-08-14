import { Ports } from "~/application/ports";
import { CalendarRepository } from "~/repositories/CalendarRepository";
import { CourseRepository } from "~/repositories/CourseRepository";
import { FeedbackRepository } from "~/repositories/FeedbackRepository";
import { NewsRepository } from "~/repositories/NewsRepository";
import { UserRepository } from "~/repositories/UserRepository";

export const usePorts = (): Ports => ({
  calendarRepository: new CalendarRepository(),
  courseRepository: new CourseRepository(),
  feedbackRepository: new FeedbackRepository(),
  newsRepository: new NewsRepository(),
  userRepository: new UserRepository(),
});

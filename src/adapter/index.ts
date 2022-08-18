import { Ports } from "~/application/ports";
import { CalendarRepository } from "~/repositories/CalendarRepository";
import { CourseRepository } from "~/repositories/CourseRepository";
import { FeedbackRepository } from "~/repositories/FeedbackRepository";
import { NewsRepository } from "~/repositories/NewsRepository";
import { UserRepository } from "~/repositories/UserRepository";

let ports: Ports | undefined = undefined;

export const usePorts = (): Ports => {
  if (ports == undefined) {
    ports = {
      calendarRepository: new CalendarRepository(),
      courseRepository: new CourseRepository(),
      feedbackRepository: new FeedbackRepository(),
      newsRepository: new NewsRepository(),
      userRepository: new UserRepository(),
    };
  }

  return ports;
};

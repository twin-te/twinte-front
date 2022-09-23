import { Ports } from "~/application/ports";
import { CalendarRepositoryInMemory } from "~/repositories/development/CalendarRepositoryInMemory";
import { CourseRepositoryInMemory } from "~/repositories/development/CourseRepositoryInMemory";
import { FeedbackRepositoryInMemory } from "~/repositories/development/FeedbackRepositoryInMemory";
import { NewsRepositoryInMemory } from "~/repositories/development/NewsRepositoryInMemory";
import { UserRepositoryInMemory } from "~/repositories/development/UserRepositoryInMemory";
import { CalendarRepository } from "~/repositories/production/CalendarRepository";
import { CourseRepository } from "~/repositories/production/CourseRepository";
import { FeedbackRepository } from "~/repositories/production/FeedbackRepository";
import { NewsRepository } from "~/repositories/production/NewsRepository";
import { UserRepository } from "~/repositories/production/UserRepository";

const dev = false;
let ports: Ports | undefined = undefined;

export const usePorts = (): Ports => {
  if (ports) return ports;

  if (dev) {
    ports = {
      calendarRepository: new CalendarRepositoryInMemory(),
      courseRepository: new CourseRepositoryInMemory(),
      feedbackRepository: new FeedbackRepositoryInMemory(),
      newsRepository: new NewsRepositoryInMemory(),
      userRepository: new UserRepositoryInMemory(),
    };
  } else {
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

import { ICalendarRepository } from "./ICalendarRepository";
import { ICourseRepository } from "./ICourseRepository";
import { IFeedbackRepository } from "./IFeedbackRepository";
import { INewsRepository } from "./INewsRepository";
import { IUserRepository } from "./IUserRepository";

export type Ports = {
  calendarRepository: ICalendarRepository;
  courseRepository: ICourseRepository;
  feedbackRepository: IFeedbackRepository;
  newsRepository: INewsRepository;
  userRepository: IUserRepository;
};

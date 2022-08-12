import { Ports } from "~/application/ports";
import { Feedback } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  PromiseResult,
  UnauthorizedError,
  ValueError,
} from "~/domain/result";

export const sendFeedback = ({ feedbackRepository }: Ports) => (
  feedback: Feedback
): PromiseResult<
  null,
  ValueError | UnauthorizedError | NetworkError | InternalServerError
> => {
  return feedbackRepository.addFeedback(feedback);
};

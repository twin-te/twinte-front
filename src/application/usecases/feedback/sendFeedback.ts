import { Ports } from "~/application/ports";
import {
  InternalServerError,
  isResultError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";
import { Feedback } from "~/domain/feedback";

export const sendFeedback = ({
  feedbackRepository,
  userRepository,
}: Ports) => async (
  feedback: Feedback
): Promise<null | UnauthorizedError | NetworkError | InternalServerError> => {
  const result = await userRepository.getUser();
  if (isResultError(result)) return result;

  const userId = result.id;

  return feedbackRepository.addFeedback(userId, feedback);
};

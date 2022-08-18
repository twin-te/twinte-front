import { Ports } from "~/application/ports";
import { Feedback } from "~/domain";
import {
  InternalServerError,
  isError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/result";

export const sendFeedback = ({
  feedbackRepository,
  userRepository,
}: Ports) => async (
  feedback: Feedback
): Promise<null | UnauthorizedError | NetworkError | InternalServerError> => {
  const result = await userRepository.getUser();
  if (isError(result)) return result;

  const userId = result.id;

  return feedbackRepository.addFeedback(userId, feedback);
};

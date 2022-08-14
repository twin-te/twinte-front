import { Ports } from "~/application/ports";
import { Feedback } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";

export const sendFeedback = ({
  feedbackRepository,
  userRepository,
}: Ports) => async (
  feedback: Feedback
): PromiseResult<
  null,
  UnauthorizedError | NetworkError | InternalServerError
> => {
  const result = await userRepository.getUser();
  if (result.isErr()) return result;

  const userId = result.value.id;

  return feedbackRepository.addFeedback(userId, feedback);
};

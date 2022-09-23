import { InternalServerError, NetworkError } from "~/domain/error";
import { Feedback } from "~/domain/feedback";

export interface IFeedbackRepository {
  addFeedback(
    userId: string,
    feedback: Feedback
  ): Promise<null | NetworkError | InternalServerError>;
}

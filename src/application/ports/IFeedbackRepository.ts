import { Feedback } from "~/domain";
import { InternalServerError, NetworkError } from "~/domain/result";

export interface IFeedbackRepository {
  addFeedback(
    userId: string,
    feedback: Feedback
  ): Promise<null | NetworkError | InternalServerError>;
}

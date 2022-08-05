import { Feedback } from "~/domain";
import { Result } from "~/domain/result";

export interface IFeedbackRepository {
  addFeedback(feedback: Feedback): Promise<Result<null>>;
}

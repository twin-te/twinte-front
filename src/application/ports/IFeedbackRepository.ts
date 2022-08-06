import { Feedback } from "~/domain";
import { PromiseResult } from "~/domain/result";

export interface IFeedbackRepository {
  addFeedback(feedback: Feedback): PromiseResult<null>;
}

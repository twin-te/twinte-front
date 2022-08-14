import { Feedback } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  PromiseResult,
} from "~/domain/result";

export interface IFeedbackRepository {
  addFeedback(
    userId: string,
    feedback: Feedback
  ): PromiseResult<null, NetworkError | InternalServerError>;
}

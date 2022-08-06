import { Feedback } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  PromiseResult,
  UnauthorizedError,
  ValueError,
} from "~/domain/result";

export interface IFeedbackRepository {
  addFeedback(
    feedback: Feedback
  ): PromiseResult<
    null,
    ValueError | UnauthorizedError | NetworkError | InternalServerError
  >;
}

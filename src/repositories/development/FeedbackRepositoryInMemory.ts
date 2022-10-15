import { IFeedbackRepository } from "~/application/ports/IFeedbackRepository";
import { InternalServerError, NetworkError } from "~/domain/error";
import { Feedback } from "~/domain/feedback";

export class FeedbackRepositoryInMemory implements IFeedbackRepository {
  async addFeedback(
    userId: string,
    feedback: Feedback
  ): Promise<null | NetworkError | InternalServerError> {
    console.log("Added Feedback");
    console.log("user id :", userId);
    console.log("type :", feedback.type);
    console.log("content :", feedback.content);
    console.log("email :", feedback.email);
    console.log("the number of screenshots :", feedback.screenShots.length);

    return null;
  }
}

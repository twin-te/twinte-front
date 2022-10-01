import { FeedbackType, feedbackTypes } from "~/domain/feedback";
import { DisplayFeedbackType } from "../viewmodels/feedback";

export const displayFeedbackTypes: DisplayFeedbackType[] = [
  "バグの報告",
  "新機能の要望",
  "お問い合わせ",
  "その他",
];

export const feedbackTypeMap: Record<FeedbackType, DisplayFeedbackType> = {
  Bug: "バグの報告",
  NewFeature: "新機能の要望",
  Contact: "お問い合わせ",
  Other: "その他",
};

export const displayToFeedbackType = (
  display: DisplayFeedbackType
): FeedbackType => {
  return feedbackTypes.find(
    (feedbackType) => feedbackTypeMap[feedbackType] === display
  ) as FeedbackType;
};

export type FeedbackType = "Bug" | "NewFeature" | "Contact" | "Other";

export type Feedback = {
  type: FeedbackType;
  screenShots: File[];
  content: string;
  email: string;
};

export const feedbackTypes: FeedbackType[] = [
  "Bug",
  "NewFeature",
  "Contact",
  "Other",
];

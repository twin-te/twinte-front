export type User = {
  id: string;
  authentication: {
    twitter: boolean;
    google: boolean;
    apple: boolean;
  };
};

export type Provider = "google" | "apple" | "twitter";

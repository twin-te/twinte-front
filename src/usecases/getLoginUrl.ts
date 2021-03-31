export type Provider = "google" | "apple" | "twitter";

export const authBaseURL = import.meta.env.DEV
  ? "https://app.dev.twinte.net/auth/v3"
  : `${window.location.origin}/auth/v3`;

export const getLoginUrl = (provider: Provider) => {
  return `${authBaseURL}/${provider}?redirect_url=${window.location.origin}`;
};

export const getLogoutUrl = () => {
  return `${authBaseURL}/logout?redirect_url=${window.location.origin}`;
};

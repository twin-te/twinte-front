export type Provider = "google" | "apple" | "twitter";

export const getLoginUrl = (provider: Provider) => {
  return `https://app.twinte.net/auth/v3/${provider}?redirect_url=https://app.twinte.net`;
};

export const getLogoutUrl = () => {
  return `https://app.twinte.net/auth/v3/logout?redirect_url=https://app.twinte.net`;
};

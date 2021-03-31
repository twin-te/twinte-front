export type Provider = "google" | "apple" | "twitter";

export const authBaseURL =
  import.meta.env.VITE_AUTH_URL === undefined
    ? "https://api.dev.twinte.net/auth/v3"
    : String(import.meta.env.VITE_AUTH_URL);

export const getLoginUrl = (provider: Provider) => {
  return `${authBaseURL}/${provider}?redirect_url=https://app.dev.twinte.net`;
};

export const getLogoutUrl = () => {
  return `${authBaseURL}/logout?redirect_url=https://app.dev.twinte.net`;
};

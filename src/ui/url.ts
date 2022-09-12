/**
 * Management for url
 */

import { Provider } from "~/domain/user";
import { isMobile } from "./ua";

export const openUrl = (url: string) => {
  if (isMobile()) {
    location.href = url;
  } else {
    window.open(url);
  }
};

export const getLoginUrl = (
  provider: Provider,
  redirectUrl = "https://app.twinte.net"
) => {
  return `https://app.twinte.net/auth/v3/${provider}?redirect_url=${redirectUrl}`;
};

export const getLogoutUrl = (redirectUrl = "https://app.twinte.net") => {
  return `https://app.twinte.net/auth/v3/logout?redirect_url=${redirectUrl}`;
};

export const getSyllabusUrl = (year: number, code: string): string => {
  return `https://kdb.tsukuba.ac.jp/syllabi/${year}/${code}/jpn/`;
};

export const getResponUrl = () => {
  return "https://atmnb.tsukuba.ac.jp";
};

export const getMapUrl = (room: string) => {
  return `https://www.google.com/maps/search/筑波大学+${room}`;
};

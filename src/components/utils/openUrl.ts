export const openUrl = (url: string) => {
  const isMobile =
    /iP(hone|(o|a)d)/.test(navigator.userAgent) ||
    /TwinteAppforAndroid/.test(navigator.userAgent)
  if (isMobile) {
    location.href = url
  } else {
    window.open(url)
  }
}

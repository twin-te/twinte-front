import { isMobile } from '~/config'

export const openUrl = (url: string) => {
  if (isMobile()) {
    location.href = url
  } else {
    window.open(url)
  }
}

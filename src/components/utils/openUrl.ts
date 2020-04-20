import { isMobile } from '../../common/ua'

export const openUrl = (url: string) => {
  if (isMobile()) {
    location.href = url
  } else {
    window.open(url)
  }
}

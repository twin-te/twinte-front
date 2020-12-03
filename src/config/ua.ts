/**
 * User Agentを管理
 */
export const isiOS = () => /iP(hone|(o|a)d)/.test(window.navigator.userAgent)
export const isAndroid = () =>
  /TwinteAppforAndroid/.test(window.navigator.userAgent)

export const isMobile = () => isiOS() || isAndroid()
export const isPc = () => !isMobile()

/**
 * Management for User Agent
 */

// https://github.com/twin-te/twinte-ios/blob/ce35c084c48403357689abb4a2cca662aafc4124/Twinte/ViewController.swift#L40
export const isiOS = () =>
  /Twin:teAppforiP(hone|ad)/.test(window.navigator.userAgent);

// https://github.com/twin-te/twinte-android/blob/6088cc29a813407c503450ce5bafe4c2b54ebe33/app/src/main/java/net/twinte/android/MainActivity.kt#L39
export const isAndroid = () =>
  /TwinteAppforAndroid/.test(window.navigator.userAgent);

export const isMobile = () => isiOS() || isAndroid();

export const isPc = () => !isMobile();

/**
 * いらなくなったら消してください。
 */

export const asyncSetTimeout = async (timeout = 1000, shouldFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error("usecase: asyncSetTimeout failed."));
      resolve("usecase: asyncSetTimeout successed.");
    }, timeout);
  });
};

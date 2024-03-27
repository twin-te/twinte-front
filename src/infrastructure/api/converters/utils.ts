export const assurePresence = <T>(v: T | undefined): T => {
  if (v === undefined) throw new Error("got undefined");
  return v;
};

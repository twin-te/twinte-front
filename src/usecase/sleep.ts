export const sleep = async (ms: number) => {
  await new Promise((done) => setTimeout(done, ms))
}

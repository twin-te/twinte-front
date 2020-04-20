/**
 * wip
 * @param blob csv data
 */

export const csvHandle = async (blob: Blob): Promise<string[]> => {
  const reader = new FileReader()
  const lectures = await new Promise<string[]>((done) => {
    reader.onload = () => {
      if (typeof reader.result !== 'string') return
      const lectures = reader.result
        .split('\r\n')
        .filter((v) => v) // drop blank line
        .map((v) => v.replace(/["]/g, '')) // drop "
      done(lectures)
    }
    reader.onerror = () => done([])
  })
  reader.readAsText(blob)

  return lectures
}

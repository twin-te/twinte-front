export const csvHandle = async (blob: Blob): Promise<string[]> => {
  const lectures = await new Promise<string[]>((done) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result !== 'string') return
      const lectures = reader.result
        .split('\r\n')
        .filter((v) => v) // drop blank line
        .map((v) => v.replace(/["]/g, '')) // drop "
      done(lectures)
    }
    reader.onerror = () => done([])
    reader.readAsText(blob)
  })

  return lectures
}

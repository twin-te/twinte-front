import { UseCase } from '.'

type R = {}
type A = string[]

export class DeleteTable implements UseCase<R, A> {
  blob: Blob

  constructor(blob: Blob) {
    this.blob = blob
  }

  async run({}: R) {
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
      reader.readAsText(this.blob)
    })

    return lectures
  }
}

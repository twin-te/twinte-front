import { PortsPick } from '~/adapter'
import { UseCase } from '.'
import Swal from 'sweetalert2'

type R = PortsPick<'store'>
type A = string[]

export class AddTableByCSV implements UseCase<R, A> {
  async blobToStrings(blob: Blob) {
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

  async inputForm(message: string): Promise<Blob | undefined> {
    const { value: file } = await Swal.fire({
      title: 'CSVファイルから追加',
      text: message,
      input: 'file',
      inputAttributes: {
        accept: 'text/csv, .csv',
        'aria-label': message,
      },
      customClass: {
        input: 'csv-form',
      },
    })
    return file
  }

  async run({ store }: R) {
    const message = `${store.getters['tableData/module']}のCSVファイルを入力してください`
    const file = await this.inputForm(message)

    if (file) {
      return this.blobToStrings(file)
    } else {
      return []
    }
  }
}

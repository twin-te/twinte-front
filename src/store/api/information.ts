import marked from 'marked'
import { OutputInformationData } from '~/api/@types'

export class Information {
  private info: OutputInformationData[] = []

  private parse(infos: OutputInformationData[]): OutputInformationData[] {
    return infos.map((info) => ({ ...info, content: marked(info.content) }))
  }

  async getInfo() {
    const response = await $nuxt.$api.information.$get()
    this.info = this.parse(response)
    return this.info
  }
}

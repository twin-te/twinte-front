import marked from 'marked'
import { OutputInformationData } from '~/api/@types'

export class Information {
  private parse(infos: OutputInformationData[]): OutputInformationData[] {
    return infos.map((info) => ({ ...info, content: marked(info.content) }))
  }

  async getInfo() {
    const response = await $nuxt.$api.information.$get()
    return this.parse(response)
  }
}

export class Tags {
  async getTags() {
    try {
      return await $nuxt.$api.tags.$get()
    } catch (error) {
      return []
    }
  }

  async postTags(name: string) {
    try {
      return await $nuxt.$api.tags.$post({ body: { name } })
    } catch (error) {
      return null
    }
  }

  async putTags(id: string, name: string) {
    try {
      return await $nuxt.$api.tags._id(id).$put({ body: { name } })
    } catch (error) {
      return null
    }
  }

  async deleteTags(id: string) {
    try {
      return await $nuxt.$api.tags._id(id).$delete()
    } catch (error) {
      return null
    }
  }
}

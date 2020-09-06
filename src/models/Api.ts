import { Model } from '@vuex-orm/core'

export default class Api extends Model {
  static entity = 'api'

  static fields() {
    return {}
  }
}

import { Model } from '@vuex-orm/core'

export default class Table extends Model {
  static entity = 'table'

  static fields() {
    return {}
  }
}

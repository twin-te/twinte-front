import { Model } from '@vuex-orm/core'

export const initialState = {
  drawer: false,
  detail: false,
  add: false,
  custom: false,
  info: false,
  table: { display: true, move: 'left' },
}

export default class Visible extends Model {
  static entity = 'visible'

  static fields() {
    return {
      id: this.uid(),
      name: this.string(''),
      display: this.boolean(false),
    }
  }
}

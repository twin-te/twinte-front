import { Database } from '@vuex-orm/core'
import Api from '@/models/Api'
import Table from '@/models/Table'
import Visible from '@/models/Visible'

const database = new Database()

database.register(Api)
database.register(Table)
database.register(Visible)

export default database

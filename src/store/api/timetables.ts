import axios from 'axios'
import { BASE_URL } from '.'

const url = BASE_URL + '/timetables'

async function getToday() {
  await axios
    .post(url + '/today')
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error(err)
    })
}

export { getToday }
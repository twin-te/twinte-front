import axios from 'axios'
import { BASE_URL } from '.'

const url = BASE_URL + '/user'

async function getMe() {
  await axios
    .get(`${url}/me`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error(err)
    })
}

export { getMe }
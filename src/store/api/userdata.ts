import axios from 'axios'
import { BASE_URL } from '.'

const url = BASE_URL + '/userdatas'

async function getUserData(year: string, lectureId: string) {
  await axios
    .post(`${url}/${year}/${lectureId}`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error(err)
    })
}

async function updateUserData(year: string, lectureId: string) {
  await axios
    .post(`${url}/${year}/${lectureId}`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error(err)
    })
}

export { getUserData, updateUserData }
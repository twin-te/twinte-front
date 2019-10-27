import axios from 'axios'
import { BASE_URL } from '.'

const url = BASE_URL + '/lectures'

/**
 * maybeLectureに該当する授業を返す
 * @param maybeLecture 検索された授業名
 */
async function searchLectures(maybeLecture: string) {
  await axios
    .post(`${url}/search`, {
      q: maybeLecture,
      year: 2019,
    })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error(err)
    })
}

async function getLectureById(maybeId: string, year: number) {
  await axios
    .get(`${url}/${year}/${maybeId}`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error(err)
    })
}

export { searchLectures, getLectureById }
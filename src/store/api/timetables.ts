import axios from 'axios'
import { BASE_URL } from '.'

const url = BASE_URL + '/timetables'

async function getToday() {
  try {
    const { data } = await axios.post(url + '/today')
    return data
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return null
  }
}

export { getToday }

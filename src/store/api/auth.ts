import axios from 'axios'
import { BASE_URL } from '.'

const url = BASE_URL

async function login() {
  await axios.get(`${url}/login`).then((res) => {
    return res.data
  })
}

async function logout() {
  await axios.get(`${url}/logout`).then((res) => {
    return res.data
  })
}

export { login, logout }

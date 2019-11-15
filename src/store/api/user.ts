/**
 *
 * たぶんいらない
 *
 */

import axios from 'axios'

import { BASE_URL } from './config'
const url = BASE_URL + '/user'

async function getMe() {
  try {
    const { data } = await axios.get(`${url}/me`)
    return data
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return null
  }
}

export { getMe }

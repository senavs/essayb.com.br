import axios from 'axios'

import { urls } from '../config'

export default class AuthService {

  static async signup(username, password) {
    try {
      const response = await axios.post(urls.user.create, { username, password })
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }
}

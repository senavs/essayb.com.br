import axios from 'axios'
import { urls } from '../config/backend'


export default class AuthService {

  static async login(username, password) {
    try {
      const response = await axios.post(urls.auth.login, { username, password })
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  static async logout(token) {
    try {
      const response = await axios.post(urls.auth.logout, null, { headers: { 'JWT-Token': `Bearer ${token}` } })
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  static async validate(token) {
    try {
      const response = await axios.post(urls.auth.validate, null, { headers: { 'JWT-Token': `Bearer ${token}` } })
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }
}

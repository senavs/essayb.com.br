import axios from 'axios'
import { urls } from '../config/backend'


export default class UserService {

  static async search(username) {
    try {
      const response = await axios.get(urls.user.search.replace('{username}', username), {})
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  static async create(username, password) {
    try {
      const response = await axios.post(urls.user.create, { username, password })
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

}
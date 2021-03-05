import axios from 'axios'
import { urls } from '../config/backend'


export default class UserService {

  static async search(id_user) {
    try {
      const response = await axios.get(urls.user.search.replace('{id_user}', id_user), {})
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
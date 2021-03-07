import { urls } from "config/backend";
import { callAPI } from "./base";

interface User {
  id_user: number,
  username: string,
  bio: string,
  url_linkedin: string,
  url_instagram: string,
  url_website: string,
  is_premium: boolean,
  profile_image: string,
  message?: string
}

interface UserSearchResponse {
  body: {
    [key: string]: User
  },
  status: number
}

export default class UserService {
  static async searchById(id_user: number): Promise<UserSearchResponse> {
    return await callAPI(urls.user.search.id_user.replace('{id_user}', id_user.toString()), 'GET')
  }

  static async searchByUsername(username: string): Promise<UserSearchResponse> {
    return await callAPI(urls.user.search.username.replace('{username}', username), 'GET')
  }
}
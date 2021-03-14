import { urls } from "config/backend";
import { callAPI } from "./base";

export interface UserInterface {
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
    [key: string]: UserInterface
  },
  status: number
}

interface UserCreateResponse {
  body: {
    [key: string]: UserInterface
  },
  status: number
}

interface UserUpdateResponse {
  body: {
    [key: string]: UserInterface
  },
  status: number
}

export default class UserService {
  static async search(id_user_or_username: string): Promise<UserSearchResponse> {
    return await callAPI(urls.user.search.replace('{id_user_or_username}', id_user_or_username), 'GET')
  }

  static async create(username: string, password: string): Promise<UserCreateResponse> {
    return await callAPI(urls.user.create, 'POST', { username, password })
  }

  static async update(token: string, new_password?: string,
    bio?: string, url_linkedin?: string, url_instagram?: string, url_website?: string
  ): Promise<UserUpdateResponse> {
    let body = {
      new_password: new_password || null,
      bio: bio || null,
      url_linkedin: url_linkedin || null,
      url_instagram: url_instagram || null,
      url_website: url_website || null,
    }

    return await callAPI(urls.user.update, 'PUT', body, { 'JWT-Token': `Bearer ${token}` })
  }
}
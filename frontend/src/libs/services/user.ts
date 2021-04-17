import { callAPI } from "./base";
import { urls } from "../../../config/backend";


export interface UserInterface {
  id_user: number,
  username: string,
  bio: string,
  url_linkedin: string,
  url_instagram: string,
  url_website: string,
  is_premium: boolean,
  message?: string
}

export type UserListInterface = Array<UserInterface>

export default class UserService {
  static async query(q: string, skip: number = 0): Promise<UserListInterface> {
    return await callAPI(urls.user.query + `?q=${q}&skip=${skip}`, 'GET')
  }

  static async search(id_user_or_username: string | number): Promise<UserInterface> {
    return await callAPI(urls.user.search.replace('{id_user_or_username}', id_user_or_username.toString()), 'GET')
  }

  static async list(): Promise<UserListInterface> {
    return await callAPI(urls.user.list, 'GET')
  }

  static async create(username: string, password: string): Promise<UserInterface> {
    return await callAPI(urls.user.create, 'POST', { username, password })
  }

  static async update(token: string, new_password?: string, profile_image?: string,
    bio?: string, url_linkedin?: string, url_instagram?: string, url_website?: string
  ): Promise<UserInterface> {
    let body = {
      new_password: new_password || null,
      profile_image: profile_image || null,
      bio: bio || null,
      url_linkedin: url_linkedin || null,
      url_instagram: url_instagram || null,
      url_website: url_website || null,
    }

    return await callAPI(urls.user.update, 'PUT', body, { 'JWT-Token': `Bearer ${token}` })
  }
}
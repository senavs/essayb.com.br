import { urls } from "../../../config/backend";
import { callAPI } from "./base";


export interface PostInterface {
  id_post: number
  id_user: number
  id_category: number
  title: string
  description: string
  is_published: boolean
  message?: string
}

export interface PostCountInterface {
  count: number
}

export default class PostService {
  static async create(title: string, description: string, thumbnail: string, id_category: number, token: string): Promise<PostInterface> {
    return await callAPI(urls.post.create, 'POST', { title, description, thumbnail, id_category }, { 'JWT-Token': `Bearer ${token}` })
  }

  static async count(username: string): Promise<PostCountInterface> {
    return await callAPI(urls.post.count.replace('{id_user_or_username}', username), 'GET')
  }
}
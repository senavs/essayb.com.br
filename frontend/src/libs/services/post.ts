import { urls } from "config/backend";
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

export default class PostService {
  static async create(title: string, description: string, thumbnail: string, id_category: number, token: string): Promise<PostInterface> {
    return await callAPI(urls.post.create, 'POST', { title, description, thumbnail, id_category }, { 'JWT-Token': `Bearer ${token}` })
  }
}
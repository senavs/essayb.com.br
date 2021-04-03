import { urls } from "../../../config/backend";
import { callAPI } from "./base";
import { CategoryInterface } from "./category";


export interface PostInterface {
  id_post: number
  id_user: number
  category: CategoryInterface
  title: string
  description: string
  is_published: boolean
  created_at: string
  updated_at: string
  message?: string
}

export type PostListInterface = Array<PostInterface>

export interface PostCountInterface {
  posts: number
}

export default class PostService {
  static async list(username: string): Promise<PostListInterface> {
    return await callAPI(urls.post.list.replace('{username}', username), 'GET')
  }

  static async search(id_post: number): Promise<PostInterface> {
    return await callAPI(urls.post.search.replace('{id_post}', id_post), 'GET')
  }

  static async count(username: string): Promise<PostCountInterface> {
    return await callAPI(urls.post.count.replace('{id_user_or_username}', username), 'GET')
  }

  static async create(title: string, description: string, thumbnail: string, id_category: number, token: string): Promise<PostInterface> {
    return await callAPI(urls.post.create, 'POST', { title, description, thumbnail, id_category, content: '' }, { 'JWT-Token': `Bearer ${token}` })
  }

  static async update(id_post: number, title?: string, description?: string, thumbnail?: string, id_category?: number, content?: string, token?: string): Promise<PostInterface> {
    let body = { id_post, title, description, thumbnail, id_category, content }

    for (let prop in body) {
      if (body[prop] === null || body[prop] === undefined) {
        delete body[prop]
      }
    }

    return await callAPI(urls.post.update, 'PUT', body, { 'JWT-Token': `Bearer ${token}` })
  }

  static async delete(id_post: number, token: string): Promise<PostInterface> {
    return await callAPI(urls.post.delete, 'DELETE', { id_post }, { 'JWT-Token': `Bearer ${token}` })
  }

}
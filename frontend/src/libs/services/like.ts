import { urls } from "../../../config/backend";
import { callAPI } from "./base";
import { PostInterface } from "./post";
import { UserInterface } from "./user";


export interface LikeInterface {
  id_like: number,
  user: UserInterface,
  post: PostInterface
}

export interface LikeCountInterface {
  likes: number
}

export interface LikeCheckInterface {
  has_liked: boolean
}

export default class LikeService {

  static async check(username: string, id_post: number): Promise<LikeCheckInterface> {
    const url = urls.like.check.replace('{username}', username).replace('{id_post}', id_post.toString())
    return await callAPI(url, 'GET')
  }

  static async countPostLikes(id_post: number): Promise<LikeCountInterface> {
    return await callAPI(urls.like.countPostLikes.replace('{id_post}', id_post.toString()), 'GET')
  }

  static async countUserLikes(username: string): Promise<LikeCountInterface> {
    return await callAPI(urls.like.countUserLikes.replace('{username}', username), 'GET')
  }

  static async create(id_post: number, token: string): Promise<LikeCountInterface> {
    return await callAPI(urls.like.create, 'POST', { id_post }, { 'JWT-Token': `Bearer ${token}` })
  }

  static async delete(id_post: number, token: string): Promise<LikeCountInterface> {
    return await callAPI(urls.like.delete, 'DELETE', { id_post }, { 'JWT-Token': `Bearer ${token}` })
  }
}
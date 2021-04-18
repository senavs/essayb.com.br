import { urls } from "../../../config/backend";
import { callAPI } from "./base";
import { UserInterface } from "./user";


export interface CommentInterface {
  id_comment: number,
  id_post: number,
  user: UserInterface,
  comment: string
}

export type CommentListInterface = Array<CommentInterface>


export default class CommentService {

  static async list(id_post: Number, skip: number = 0): Promise<CommentListInterface> {
    return await callAPI(urls.comment.list.replace('{id_post}', id_post.toString()) + `?skip=${skip}`, 'GET')
  }

  static async create(id_post: number, comment: string, token: string): Promise<CommentInterface> {
    return await callAPI(urls.comment.create, 'POST', { id_post, comment }, { 'JWT-Token': `Bearer ${token}` })
  }

  static async delete(id_comment: number, token: string) {
    return await callAPI(urls.comment.delete, 'DELETE', { id_comment }, { 'JWT-Token': `Bearer ${token}` })
  }
}
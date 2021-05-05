import { urls } from "../../../config/backend";
import { callAPI } from "./base";


export interface FollowInterface {
  id_follow: number
  id_user_follower: number
  id_user_following: number
}

export type FollowListInterface = Array<FollowInterface>

export interface FollowCountInterface {
  count: number
}

export interface CheckFollowingInterface {
  is_following: boolean
}

export interface DeleteInterface {
  deleted: boolean
}

export default class FollowService {

  static async countFollowers(username: string): Promise<FollowCountInterface> {
    return await callAPI(urls.follow.countFollowers.replace('{username}', username), 'GET')
  }

  static async countFollowings(username: string): Promise<FollowCountInterface> {
    return await callAPI(urls.follow.countFollowings.replace('{username}', username), 'GET')
  }

  static async check(username_follower: string, username_following: string): Promise<CheckFollowingInterface> {
    return await callAPI(urls.follow.check.replace('{username_follower}', username_follower).replace('{username_following}', username_following), 'GET')
  }

  static async create(token: string, username_following: string): Promise<FollowInterface> {
    return await callAPI(urls.follow.create, 'POST', { username_following }, { 'JWT-Token': `Bearer ${token}` })
  }

  static async delete(token: string, username_following: string): Promise<DeleteInterface> {
    return await callAPI(urls.follow.delete, 'DELETE', { username_following }, { 'JWT-Token': `Bearer ${token}` })
  }
  
  static async list_follower(username: string, skip: number = 0): Promise<FollowListInterface> {
    return await callAPI(urls.follow.list_follower.replace('{username}', username) + `?skip=${skip}`, 'GET')
  }

  static async list_following(username: string, skip: number = 0): Promise<FollowListInterface> {
    return await callAPI(urls.follow.list_following.replace('{username}', username) + `?skip=${skip}`, 'GET')
  }
}
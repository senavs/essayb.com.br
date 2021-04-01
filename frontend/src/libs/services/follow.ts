import { urls } from "../../../config/backend";
import { callAPI } from "./base";

export interface FollowInterface {
    id_user: number
  }

  export type FollowListInterface = Array<FollowInterface>

export interface FollowCountInterface {
  count: number
}

export default class FollowService {

      static async count_follower(username: string): Promise<FollowCountInterface> {
        return await callAPI(urls.follow.count_follower.replace('{username}', username), 'GET')
      }

      static async count_following(username: string): Promise<FollowCountInterface> {
        return await callAPI(urls.follow.count_following.replace('{username}', username), 'GET')
      }
  }
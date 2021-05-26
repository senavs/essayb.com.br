import { callAPI } from "./base";
import { urls } from "../../../config/backend";
import { UserInterface } from "./user";
import { PostInterface } from "./post";


export type MostFollowedUsersInterface = Array<UserInterface>
export type MostPostLikedUserPremium = Array<PostInterface>
export type DiscoveryPosts = Array<PostInterface>

export default class AnalyticsService {
  static async mostFollowedUsers(): Promise<MostFollowedUsersInterface> {
    return await callAPI(urls.analytics.mostFollowedUsers, 'GET')
  }

  static async mostLikedPostUserPremium(): Promise<MostPostLikedUserPremium> {
    return await callAPI(urls.analytics.mostLikedPostUserPremium, 'GET')
  }

  static async discoveryPosts(): Promise<DiscoveryPosts> {
    return await callAPI(urls.analytics.discovery, 'GET')
  }
}
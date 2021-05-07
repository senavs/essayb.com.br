import { callAPI } from "./base";
import { urls } from "../../../config/backend";
import { UserInterface } from "./user";


export type MostFollowedUsersInterface = Array<UserInterface>

export default class AnalyticsService {
  static async mostFollowedUsers(): Promise<MostFollowedUsersInterface> {
    return await callAPI(urls.analytics.mostFollowedUsers, 'GET')
  }
}
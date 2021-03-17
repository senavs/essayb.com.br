import UserService from "../services/user";


export interface ProfileUserData {
  id_user?: number,
  username?: string,
  bio?: string,
  url_linkedin?: string,
  url_instagram?: string,
  url_website?: string,
  is_premium?: boolean,
}

export async function getProfileUserData(username: string): Promise<ProfileUserData> {
  if (typeof window === 'undefined') {
    try {
      const userResponse = await UserService.search(username)
      return userResponse.body
    } catch {
    }
  }
  return {}
}

export async function getProfilePostData(username: string) {

}
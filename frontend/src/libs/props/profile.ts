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

export async function getProfileUserData(id_user_or_username: string | number): Promise<ProfileUserData> {
  if (typeof window === 'undefined') {
    try {
      return await UserService.search(id_user_or_username)
    } catch {
    }
  }
  return {}
}
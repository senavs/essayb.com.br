import FollowService from "../services/follow";
import LikeService from "../services/like";
import PostService from "../services/post";
import UserService from "../services/user";


export interface ProfileUserData {
  id_user: number,
  username: string,
  bio: string,
  url_linkedin: string,
  url_instagram: string,
  url_website: string,
  is_premium: boolean,
  postCount: number,
  likeCount: number,
  followerCount: number,
  followingCount: number,
  wasFound: boolean
}

export async function getProfileUserData(id_user_or_username: string | number): Promise<ProfileUserData> {
  const profileUserData = {
    id_user: null, username: '', bio: '', url_linkedin: '', url_instagram: '', url_website: '', is_premium: false,
    postCount: null, likeCount: null, followerCount: null, followingCount: null, wasFound: false
  }

  if (typeof window === 'undefined') {
    try {
      Object.assign(profileUserData, (await UserService.search(id_user_or_username)))
      profileUserData.postCount = (await PostService.count(profileUserData.username)).posts
      profileUserData.likeCount = (await LikeService.countUserLikes(profileUserData.username)).likes
      profileUserData.followerCount = (await FollowService.countFollowers(profileUserData.username)).count
      profileUserData.followingCount = (await FollowService.countFollowings(profileUserData.username)).count
      profileUserData.wasFound = true
    } catch {
    }
  }
  return profileUserData
}
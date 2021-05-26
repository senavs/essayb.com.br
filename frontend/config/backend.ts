import getConfig from "next/config"


const { publicRuntimeConfig } = getConfig()

const backendDomain = publicRuntimeConfig.BACKEND_DOMAIN
const protocol = process.env.USE_HTTPS ? 'https' : 'http'

export const urls = {
  analytics: {
    mostFollowedUsers: `${protocol}://${backendDomain}/v1/analytics/most_followed_users`,
    mostLikedPosts: `${protocol}://${backendDomain}/v1/analytics/most_liked_posts`,
    mostLikedPostUserPremium: `${protocol}://${backendDomain}/v1/analytics/most_liked_posts_monthly`,
    discovery: `${protocol}://${backendDomain}/v1/analytics/discovery`
  },
  auth: {
    login: `${protocol}://${backendDomain}/v1/auth/login`,
    logout: `${protocol}://${backendDomain}/v1/auth/logout`,
    validate: `${protocol}://${backendDomain}/v1/auth/validate`,
  },
  user: {
    query: `${protocol}://${backendDomain}/v1/users/query`,
    search: `${protocol}://${backendDomain}/v1/users/{id_user_or_username}/search`,
    list: `${protocol}://${backendDomain}/v1/users/list`,
    profile_image: `${protocol}://${backendDomain}/v1/users/{username}/profile_image`,
    create: `${protocol}://${backendDomain}/v1/users/create`,
    update: `${protocol}://${backendDomain}/v1/users/update`,
  },
  category: {
    list: `${protocol}://${backendDomain}/v1/categories/list`
  },
  post: {
    query: `${protocol}://${backendDomain}/v1/posts/query`,
    search: `${protocol}://${backendDomain}/v1/posts/{id_post}/search`,
    list: `${protocol}://${backendDomain}/v1/posts/{username}/list`,
    filter: `${protocol}://${backendDomain}/v1/posts/{id_category}/filter`,
    count: `${protocol}://${backendDomain}/v1/posts/{id_user_or_username}/count`,
    thumbnail: `${protocol}://${backendDomain}/v1/posts/{id_post}/thumbnail`,
    create: `${protocol}://${backendDomain}/v1/posts/create`,
    update: `${protocol}://${backendDomain}/v1/posts/update`,
    publish: `${protocol}://${backendDomain}/v1/posts/publish`,
    delete: `${protocol}://${backendDomain}/v1/posts/delete`,
  },
  like: {
    check: `${protocol}://${backendDomain}/v1/likes/{username}/{id_post}/check`,
    countPostLikes: `${protocol}://${backendDomain}/v1/likes/post/{id_post}/count`,
    countUserLikes: `${protocol}://${backendDomain}/v1/likes/user/{username}/count`,
    create: `${protocol}://${backendDomain}/v1/likes/create`,
    delete: `${protocol}://${backendDomain}/v1/likes/delete`,
  },
  follow: {
    countFollowers: `${protocol}://${backendDomain}/v1/follows/follower/{username}/count`,
    countFollowings: `${protocol}://${backendDomain}/v1/follows/following/{username}/count`,
    check: `${protocol}://${backendDomain}/v1/follows/{username_follower}/{username_following}/check`,
    create: `${protocol}://${backendDomain}/v1/follows/create`,
    delete: `${protocol}://${backendDomain}/v1/follows/delete`,
    list_follower: `${protocol}://${backendDomain}/v1/follows/follower/{username}/list`,
    list_following: `${protocol}://${backendDomain}/v1/follows/following/{username}/list`
  },
  comment: {
    list: `${protocol}://${backendDomain}/v1/comments/{id_post}/list`,
    create: `${protocol}://${backendDomain}/v1/comments/create`,
    delete: `${protocol}://${backendDomain}/v1/comments/delete`,
  },
  payment: {
    checkout: `${protocol}://${backendDomain}/v1/payments/checkout`,
    accept: `${protocol}://${backendDomain}/v1/payments/accept`,
  },
  premium: {
    status: `${protocol}://${backendDomain}/v1/premium/status`,
  }
}

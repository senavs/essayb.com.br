import getConfig from "next/config"

const { publicRuntimeConfig } = getConfig()

const backendDomain = publicRuntimeConfig.BACKEND_DOMAIN
const protocol = process.env.USE_HTTPS ? 'https' : 'http'

export const urls = {
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
    count: `${protocol}://${backendDomain}/v1/posts/{id_user_or_username}/count`,
    thumbnail: `${protocol}://${backendDomain}/v1/posts/{id_post}/thumbnail`,
    create: `${protocol}://${backendDomain}/v1/posts/create`,
    update: `${protocol}://${backendDomain}/v1/posts/update`,
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
    delete: `${protocol}://${backendDomain}/v1/follows/delete`
  },
  comment: {
    list: `${protocol}://${backendDomain}/v1/comments/{id_post}/list`,
    create: `${protocol}://${backendDomain}/v1/comments/create`,
    delete: `${protocol}://${backendDomain}/v1/comments/delete`
  }
}

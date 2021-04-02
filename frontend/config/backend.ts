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
    search: `${protocol}://${backendDomain}/v1/posts/{id_post}/search`,
    count: `${protocol}://${backendDomain}/v1/posts/{id_user_or_username}/count`,
    thumbnail: `${protocol}://${backendDomain}/v1/posts/{id_post}/thumbnail`,
    create: `${protocol}://${backendDomain}/v1/posts/create`,
    update: `${protocol}://${backendDomain}/v1/posts/update`,
    list: `${protocol}://${backendDomain}/v1/posts/user/{username}/list`,
  },
  like: {
    check: `${protocol}://${backendDomain}/v1/likes/{username}/{id_post}/check`,
    countPostLikes: `${protocol}://${backendDomain}/v1/likes/post/{id_post}/count`,
    countUserLikes: `${protocol}://${backendDomain}/v1/likes/user/{username}/count`,
  }
}

// TODO: fix to work in server and client side
const backendDomain = process.env.BACKEND_DOMAIN || '172.17.0.1:8080'

export const urls = {
  auth: {
    login: process.env.URL_AUTH_LOGIN || `http://${backendDomain}/v1/auth/login`,
    logout: process.env.URL_AUTH_LOGOUT || `http://${backendDomain}/v1/auth/logout`,
    validate: process.env.URL_AUTH_VALIDATE || `http://${backendDomain}/v1/auth/validate`,
  },
  user: {
    search: process.env.URL_USER_SEARCH || `http://${backendDomain}/v1/users/{id_user_or_username}/search`,
    profile_image: process.env.URL_USER_PROFILE_IMAGE || `http://${backendDomain}/v1/users/{username}/profile_image`,
    create: process.env.URL_USER_CREATE || `http://${backendDomain}/v1/users/create`,
    update: process.env.URL_USER_UPDATE || `http://${backendDomain}/v1/users/update`,
  }
}

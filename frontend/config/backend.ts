const backendDomain = process.env.BACKEND_DOMAIN
const protocol = process.env.USE_HTTPS ? 'https' : 'http'

export const urls = {
  auth: {
    login: `${protocol}://${backendDomain}/v1/auth/login`,
    logout: `${protocol}://${backendDomain}/v1/auth/logout`,
    validate: `${protocol}://${backendDomain}/v1/auth/validate`,
  },
  user: {
    search: `${protocol}://${backendDomain}/v1/users/{id_user_or_username}/search`,
    profile_image: `${protocol}://${backendDomain}/v1/users/{username}/profile_image`,
    create: `${protocol}://${backendDomain}/v1/users/create`,
    update: `${protocol}://${backendDomain}/v1/users/update`,
  }
}

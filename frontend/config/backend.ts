export const urls = {
  auth: {
    login: process.env.URL_AUTH_LOGIN || 'http://0.0.0.0:8888/v1/auth/login',
    logout: process.env.URL_AUTH_LOGOUT || 'http://0.0.0.0:8888/v1/auth/logout',
    validate: process.env.URL_AUTH_VALIDATE || 'http://0.0.0.0:8888/v1/auth/validate',
  },
  user: {
    search: {
      id_user: process.env.URL_USER_SEARCH_ID || 'http://0.0.0.0:8888/v1/users/{id_user}/search/id',
      username: process.env.URL_USER_SEARCH_USERNAME || 'http://0.0.0.0:8888/v1/users/{username}/search/username'
    },
    create: process.env.URL_USER_CREATE || 'http://0.0.0.0:8888/v1/users/create',
    update: process.env.URL_USER_UPDATE || 'http://0.0.0.0:8888/v1/users/update',
  }
}

import CookiesServer from 'cookies'

import AuthService from '../services/auth'
import UserService from '../services/user'


export interface AuthenticationDataInterface {
  token?: string,
  id_user?: number,
  isAuthenticated?: boolean
  user: {
    id_user?: number,
    username?: string,
    bio?: string,
    url_linkedin?: string,
    url_instagram?: string,
    url_website?: string,
    is_premium?: boolean,
    profile_image?: string,
  }
}

export async function getAuthenticationData({ req, res }): Promise<AuthenticationDataInterface> {
  const cookies = CookiesServer(req, res)
  const token = cookies.get('token')
  let authenticationData = { token: '', id_user: null, isAuthenticated: false, user: {} }

  if (typeof window === 'undefined') {
    if (!token) {
      return authenticationData
    } else {
      try {
        const authResponse = await AuthService.validate(token)
        Object.assign(authenticationData, { ...authResponse.body, isAuthenticated: true })

        const userResponse = await UserService.searchById(authenticationData.id_user)
        Object.assign(authenticationData, { user: { ...userResponse.body } })
      } catch (err) {
        return authenticationData
      }
    }
  }
  return authenticationData
}
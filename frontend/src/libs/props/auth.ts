import CookiesServer from 'cookies'

import AuthService from '../services/auth'
import UserService from '../services/user'


export interface AuthenticationData {
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
  }
}

export async function getAuthenticationData({ req, res }): Promise<AuthenticationData> {
  const cookies = CookiesServer(req, res)
  const token = cookies.get('token')
  let authenticationData = { token: '', id_user: null, isAuthenticated: false, user: {} }

  if (typeof window === 'undefined') {
    if (!token) {
      return authenticationData
    } else {
      try {
        const authResponse = await AuthService.validate(token)
        Object.assign(authenticationData, { ...authResponse, isAuthenticated: true })

        const userResponse = await UserService.search(authenticationData.id_user)
        Object.assign(authenticationData, { user: { ...userResponse } })
      } catch (err) {
        console.log(err)
        cookies.set('token', '', {
          path: '/',
          domain: process.env.FRONTEND_DOMAIN,
          secure: Boolean(process.env.USE_HTTPS)
        })
        return authenticationData
      }
    }
  }
  return authenticationData
}
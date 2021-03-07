import { urls } from 'config/frontend'
import CookiesServer from 'cookies'

import AuthService from '../services/auth'
import UserService from '../services/user'


export interface AuthenticationData {
  token: string,
  id_user: number,
  isAuthenticated: boolean
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

function redirect(res, path: string) {
  res.setHeader('Location', path)
  res.statusCode = 302
}

export async function loginSuggested({ req, res }): Promise<AuthenticationData> {
  const cookies = CookiesServer(req, res)
  const token = cookies.get('token')
  let authenticationData = { token: '', id_user: null, isAuthenticated: false, user: {} }

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

  return authenticationData
}

export async function loginRequired({ req, res }, getUserInfos = false): Promise<AuthenticationData> {
  const authenticationData = await loginSuggested({ req, res })

  if (!authenticationData.isAuthenticated) {
    redirect(res, urls.auth.login)
  } 

  return authenticationData
}

export async function loginDenied({ req, res }): Promise<void> {
  if (typeof window === 'undefined') {
    const cookies = CookiesServer(req, res)
    const token = cookies.get('token')

    if (token) {
      try {
        await AuthService.validate(token)
        redirect(res, urls.common.index)
      } catch {
      }
    }
  }
}

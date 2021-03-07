import { urls } from "config/backend";
import { callAPI } from "./base";


interface LoginResponse {
  body: {
    token: string,
    id_user: number
  },
  status: number
}

interface ValidateResponse {
  body: {
    token: string,
    id_user: number
  },
  status: number
}

export default class AuthService {
  static async login(username: string, password: string): Promise<LoginResponse> {
    return await callAPI(urls.auth.login, 'POST', { username, password })
  }

  static async logout(token: string) {
    return await callAPI(urls.auth.logout, 'POST', null, { 'JWT-Token': `Bearer ${token}` })
  }

  static async validate(token: string): Promise<ValidateResponse> {
    return await callAPI(urls.auth.validate, 'POST', null, { 'JWT-Token': `Bearer ${token}` })
  }
}
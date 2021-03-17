import { urls } from 'config/frontend';
import CookieClient from 'js-cookie'
import Router from 'next/router';
import { createContext, ReactNode } from "react";

import { AuthenticationDataInterface } from "src/libs/serverSide/auth"
import AuthService, { LoginResponse } from "../services/auth";


interface AuthProviderProps {
  children: ReactNode,
  authenticationData: AuthenticationDataInterface
}

interface AuthProviderValue {
  authenticationData: AuthenticationDataInterface
  login: (...rest: any) => void,
  logout: (...rest: any) => void,
  validate: (...rest: any) => void
}

export const AuthContext = createContext({
  authenticationData: {
    token: '',
    id_user: null,
    isAuthenticated: false,
    user: {},
  }
} as AuthProviderValue)

export function AuthProvider({ children, authenticationData }: AuthProviderProps) {

  function login(username: '', password: string, resolve = (res: LoginResponse) => { }, reject = (res: LoginResponse) => { }) {
    AuthService.login(username, password)
      .then(res => {
        CookieClient.set('token', res.body.token)
        Router.push(urls.common.index)
        resolve(res)
      })
      .catch(reject)
  }

  function logout(resolve = (res: LoginResponse) => { }, reject = (res: LoginResponse) => { }) {
    AuthService.logout(authenticationData.token)
      .then(res => {
        CookieClient.remove('token')
        Router.push(urls.common.index)
        resolve(res)
      })
      .catch(err => {
        CookieClient.remove('token')
        Router.push(urls.common.index)
        reject(err)
      })
  }

  function validate(resolve = (res: LoginResponse) => { }, reject = (res: LoginResponse) => { }) {
    AuthService.logout(authenticationData.token)
      .then(resolve)
      .catch(err => {
        CookieClient.remove('token')
        Router.push(urls.common.index)
        reject(err)
      })
  }

  return (
    <AuthContext.Provider value={{ authenticationData, login, logout, validate }}>
      {children}
    </AuthContext.Provider>
  )
}
import { urls } from 'config/frontend';
import CookieClient from 'js-cookie'
import Router from 'next/router';
import { createContext, ReactNode } from "react";

import { AuthenticationData } from "../../libs/serverSide/auth"
import AuthService, { AuthInterface } from "../services/auth";


interface AuthProviderProps {
  children: ReactNode,
  authenticationData: AuthenticationData
}

interface AuthProviderValue {
  authenticationData: AuthenticationData
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

  function login(username: '', password: string, resolve = (res: AuthInterface) => { }, reject = (res: AuthInterface) => { }) {
    AuthService.login(username, password)
      .then(res => {
        CookieClient.set('token', res.token)
        Router.push(urls.common.index)
        resolve(res)
      })
      .catch(reject)
  }

  function logout(resolve = (res: AuthInterface) => { }, reject = (res: AuthInterface) => { }) {
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

  function validate(resolve = (res: AuthInterface) => { }, reject = (res: AuthInterface) => { }) {
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
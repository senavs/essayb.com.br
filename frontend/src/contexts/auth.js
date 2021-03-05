import { createContext, useEffect } from 'react'

import AuthService from '../services/auth'
import { useLocalStorage } from '../utils/hooks'


export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  // states
  const [auth, setAuth, deleteAuth] = useLocalStorage('auth')

  // efects
  useEffect(() => {
    if (auth.token) {
      AuthService.validate(auth.token).then(setAuth).catch(deleteAuth)
    }
  }, [])

  // functions
  function login(username, password, resolve, reject) {
    AuthService.login(username, password)
      .then(res => {
        setAuth(res)
        resolve(res)
      })
      .catch(reject)
  }
  function logout(resolve, reject) {
    if (auth.token) {
      AuthService.logout(auth.token)
        .then(resolve)
        .catch(reject)
    }
    deleteAuth()
  }
  function validate(resolve, reject) {
    if (auth.token) {
      AuthService.validate(auth.token)
        .then(resolve)
        .catch(err => {
          deleteAuth()
          reject(err)
        })
    }
  }

  // render
  return (
    <AuthContext.Provider value={{ auth, login, logout, validate }}>
      {children}
    </AuthContext.Provider>
  )
}

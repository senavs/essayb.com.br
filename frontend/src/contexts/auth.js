import { createContext, useEffect } from 'react'

import AuthService from '../services/auth'
import UserService from '../services/user'
import { useLocalStorage } from '../utils/hooks'


export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  // states
  const [token, setToken, deleteToken] = useLocalStorage('token', '')
  const [user, setUser, deleteUser] = useLocalStorage('user', {})

  // efects
  useEffect(() => {
    if (token) {
      AuthService.validate(token)
        .then(res => {
          setToken(res.token)
          UserService.search(res.user.id_user)
            .then(setUser)
            .catch(deleteUser)
        }).catch(deleteToken)
    }
  }, [])

  // functions
  function login(username, password, resolve, reject) {
    AuthService.login(username, password)
      .then(res => {
        setToken(res.token)
        UserService.search(res.user.id_user)
          .then(setUser)
          .catch(deleteUser)
        resolve(res)
      })
      .catch(reject)
  }
  function logout(resolve, reject) {
    if (token) {
      AuthService.logout(token)
        .then(resolve)
        .catch(reject)
    }
    deleteToken()
    deleteUser()
  }
  function validate(resolve, reject) {
    if (token) {
      AuthService.validate(token)
        .then(resolve)
        .catch(err => {
          deleteToken()
          deleteUser()
          reject(err)
        })
    }
  }

  // render
  return (
    <AuthContext.Provider value={{ token, user, setUser, setToken, login, logout, validate }}>
      {children}
    </AuthContext.Provider>
  )
}

import { createContext } from 'react'
import { useLocalStorage } from '../utils/hooks'


export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  // states
  const [auth, setAuth, deleteAuth] = useLocalStorage('auth')

  // render
  return (
    <AuthContext.Provider value={{ auth, setAuth, deleteAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

import { createContext, useState } from 'react'


function useAuth(key) {
  const [state, setState] = useState(JSON.parse(localStorage.getItem(key)) || {})

  const setAuth = (value) => {
    setState(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  const deleteAuth = () => {
    setState({})
    localStorage.removeItem(key)
  }

  return [state, setAuth, deleteAuth]
}

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
  const [auth, setAuth, deleteAuth] = useAuth('auth')

  // render
  return (
    <AuthContext.Provider value={{ auth, setAuth, deleteAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

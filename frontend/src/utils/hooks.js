import { useState } from 'react'


export function useLocalStorage(key) {
  const [state, setState] = useState(JSON.parse(localStorage.getItem(key)) || {})

  const setLocalStorage = (value) => {
    setState(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  const deleteLocalStorage = () => {
    setState({})
    localStorage.removeItem(key)
  }

  return [state, setLocalStorage, deleteLocalStorage]
}
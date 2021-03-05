import { useState } from 'react'


export function useLocalStorage(key, defaultValue = {}) {
  const [state, setState] = useState(JSON.parse(localStorage.getItem(key)) || defaultValue)

  const setLocalStorage = (value) => {
    setState(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  const deleteLocalStorage = () => {
    setState(defaultValue)
    localStorage.removeItem(key)
  }

  return [state, setLocalStorage, deleteLocalStorage]
}
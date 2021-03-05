import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'

import { AuthContext } from '../contexts/auth'


export default function PrivateRoute({ component: Component, ...rest }) {
  // contexts
  const { auth } = useContext(AuthContext)

  // render
  return (
    <Route
      {...rest}
      render={() => (auth.token && auth.user) ? <Component {...rest} /> : <Redirect to="/login" />}
    />
  )
}
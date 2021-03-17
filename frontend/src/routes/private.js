import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { urls } from '../config/frontend'

import { AuthContext } from '../contexts/auth'


export default function PrivateRoute({ component: Component, ...rest }) {
  // contexts
  const { token, user } = useContext(AuthContext)

  // render
  return (
    <Route
      {...rest}
      render={() => (token && Object.keys(user).length > 0) ? <Component {...rest} /> : <Redirect to={urls.auth.login} />}
    />
  )
}
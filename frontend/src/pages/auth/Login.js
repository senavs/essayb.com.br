import { useContext, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import Title from '../../components/common/Title'

import { AuthContext } from '../../contexts/auth'


export default function Login() {
  // contexts
  const { auth, login } = useContext(AuthContext)

  // states
  const history = useHistory()
  const [formValue, setFormValue] = useState({ username: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')

  // functions
  function onChange(event) {
    const { name, value } = event.target
    setFormValue({
      ...formValue,
      [name]: value
    })
  }
  function onSubmit(event) {
    event.preventDefault()
    setErrorMessage('')

    // call api to login user
    login(formValue.username, formValue.password,
      () => history.push('/'),
      (err) => setErrorMessage(err.message))
  }

  // render
  if (auth.token) {
    return <Redirect to="/" />
  }

  return (
    <div className="container">
      <div className="row">
        <div className="offset-md-4 col-md-4 col-12">
          <div className="col">
            <Title>Login</Title>
          </div>
          <div className="container mb-3 border rounded p-3 shadow-sm">
            <form onSubmit={onSubmit}>

              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  name="username"
                  type="text"
                  className="form-control"
                  placeholder="Enter your username. Eg: essayb"
                  maxLength={32}
                  value={formValue.username}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formValue.password}
                  onChange={onChange}
                  required
                />
              </div>

              <small className="d-block mb-3 text-danger">{errorMessage}</small>
              <button type="submit" className="btn btn-primary" >Login</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
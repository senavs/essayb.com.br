import { useContext, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import Title from '../../components/common/Title'
import { urls } from '../../config/frontend'

import { AuthContext } from '../../contexts/auth'
import UserService from '../../services/user'
import { validatePassword, validateUsername } from '../../utils/form'


export default function SignUp() {
  // contexts
  const { token } = useContext(AuthContext)

  // states
  const history = useHistory()
  const [formValue, setFormValue] = useState({ username: '', password: '', confirmPassword: '' })
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

    if (!validateUsername(formValue.username)) {
      return setErrorMessage("invalid username or password")
    }
    if (!validatePassword(formValue.password, formValue.confirmPassword)) {
      return setErrorMessage("invalid username or password")
    }

    UserService.create(formValue.username, formValue.password)
      .then(() => history.push(urls.auth.login))
      .catch((err) => setErrorMessage(err.message))
  }

  // render
  if (token) {
    return <Redirect to={urls.common.index} />
  }

  return (
    <div className="container">
      <div className="row">
        <div className="offset-md-4 col-md-4 col-12">

          <div className="col">
            <Title>Sign up</Title>
          </div>

          <div className="container mb-3 border rounded p-3 shadow-sm">
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  name="username"
                  type="text"
                  className="form-control"
                  placeholder="Eg: essayb"
                  maxLength={32}
                  value={formValue.username}
                  onChange={onChange}
                  required
                />
                <small className="form-text">Only letters (A-Z a-z), numbers (0-9), dot and underscore.</small>
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Your password"
                  value={formValue.password}
                  onChange={onChange}
                  required />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                  placeholder="Confirm your password"
                  value={formValue.confirmPassword}
                  onChange={onChange}
                  required
                />
              </div>

              <small className="d-block mb-3 text-danger">{errorMessage}</small>
              <button type="submit" className="btn btn-primary" >Sign up</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
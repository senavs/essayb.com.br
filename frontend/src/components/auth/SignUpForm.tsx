import { urls } from 'config/frontend'
import Router from 'next/router'
import { useState } from "react"
import UserService from "src/libs/services/user"
import Title from "../common/Title"

interface FormValue {
  username: string,
  password: string,
  confirmPassword: string
}

export default function SignUpForm() {
  const [formValue, setFormValue] = useState({ username: '', password: '', confirmPassword: '' } as FormValue)
  const [errorMessage, setErrorMessage] = useState('')

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

    UserService.create(formValue.username, formValue.password)
      .then(() => { Router.push(urls.auth.login)})
      .catch(err => setErrorMessage(err.body.message))
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
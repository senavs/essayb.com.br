import { urls } from 'config/frontend'
import Router from 'next/router'
import { useContext, useState } from "react"
import { AuthContext } from 'src/libs/contexts/auth'
import UserService from "src/libs/services/user"
import { validatePasswords } from 'src/libs/utils/form'


interface FormValue {
  username: string,
  password: string,
  confirmPassword: string
}

export default function SignUpForm() {
  const { login } = useContext(AuthContext)
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

    if (!validatePasswords(formValue.password, formValue.confirmPassword)) {
      return setErrorMessage('Passwords didn\'t match')
    }

    UserService.create(formValue.username, formValue.password)
      .then(() => { login(formValue.username, formValue.password) })
      .catch(err => setErrorMessage(err.body.message))
  }

  return (

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
          minLength={3}
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
          minLength={3}
          value={formValue.confirmPassword}
          onChange={onChange}
          required
        />
      </div>

      <small className="d-block mb-3 text-danger">{errorMessage}</small>
      <button type="submit" className="btn btn-primary" >Sign up</button>

    </form>

  )
}
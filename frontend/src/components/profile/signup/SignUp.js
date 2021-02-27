import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import AuthService from '../../../services/Auth'


export default function SignUp() {
  // states
  const history = useHistory()
  const [formValue, setFormValue] = useState({ username: '', password: '', confirmPassword: '' })
  const [errorMessage, setErrorMessage] = useState('')

  // functions
  const handlerForm = (event) => {
    const { name, value } = event.target
    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  const handlerSubmit = (event) => {
    event.preventDefault()
    setErrorMessage('')

    // valdiate passwords
    if (formValue.password !== formValue.confirmPassword) {
      return setErrorMessage("Passwords did not match.")
    }

    // call api to craete new user
    AuthService.signup(formValue.username, formValue.password)
      .then(() => history.push('/login'))
      .catch((err) => setErrorMessage(err.message))
  }

  // render
  return (
    <div className="container">
      <div className="row">
        <div className="offset-md-4 col-md-4 col-12">
          <div className="col">
            <h1 className="mb-4 fst-italic border-bottom">Sign up</h1>
          </div>
          <div className="container mb-3 border rounded p-3 shadow-sm">
            <form onSubmit={handlerSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" maxLength="32" className="form-control" name="username" value={formValue.username} onChange={handlerForm} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" name="password" value={formValue.password} onChange={handlerForm} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm password</label>
                <input type="password" className="form-control" name="confirmPassword" value={formValue.confirmPassword} onChange={handlerForm} required />
              </div>
              <small className="d-block mb-3 text-danger">{errorMessage}</small>
              <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
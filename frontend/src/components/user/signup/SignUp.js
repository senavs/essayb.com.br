import { useContext, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { AuthContext } from '../../../context/auth'
import UserService from '../../../services/user'


export default function SignUp() {
  // contexts
  const { auth } = useContext(AuthContext)

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
  const onSubmit = (event) => {
    event.preventDefault()
    setErrorMessage('')

    // valdiate passwords
    if (formValue.password !== formValue.confirmPassword) {
      return setErrorMessage("Passwords did not match.")
    }
    // call api to craete new user
    UserService.create(formValue.username, formValue.password)
      .then(() => history.push('/login'))
      .catch((err) => setErrorMessage(err.message))
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
            <h1 className="mb-4 fst-italic border-bottom">Sign up</h1>
          </div>
          <div className="container mb-3 border rounded p-3 shadow-sm">
            <form onSubmit={onSubmit}>
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
              <button type="submit" className="btn btn-primary" >Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}